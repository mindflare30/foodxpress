const express = require('express')
const User = require('../models/User')
const Order = require('../models/Orders')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios')
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa"


router.post('/createuser', [
// Before processing the request, the code utilizes validation middleware from the express-validator 
// library to validate the request body. It checks whether the email is a valid email address, whether 
// the password has a minimum length of 5 characters, and whether the name has a minimum length of 3 characters.
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    // If there are validation errors (e.g., invalid email, short password, or short name),
    //  the code returns a 400 Bad Request response with an array of validation errors.   
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
 // After passing validation, the code generates a secure password hash using the bcrypt library. It generates a salt with a factor of 10 (a cost factor used to control the computational effort required for hashing).
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
//After successfully creating the user, the code generates a JSON Web Token (JWT) containing the user's unique ID (user.id) as the payload data. The JWT is signed using a secret (jwtSecret) to ensure its authenticity.3
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            
        .catch(err => {
            console.log(err);
            res.json({ error: "Please enter a unique value." })
            })
    } 
    
    catch (error) {
        console.error(error.message)
    }
})




// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        // payload some info of user to use in token generation along with jwtSecret
        const data = { 
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})
//Assume you have an Express server with a router that handles a POST request to '/getuser'. This route is protected using the fetch middleware we discussed earlier, which checks for a valid JWT token in the request headers to ensure the user is authenticated.
router.post('/getuser', fetch, async (req, res) => {
    // fetch,ye middleware check krega ki authorised aadmi h yaa nhi
    try {
// Extracting the user ID from the request object (req.user.id)
        const userId = req.user.id;
// Retrieving the user information from the database using the user ID
        const user = await User.findById(userId).select("-password") 
    
// Sending the user data as the response (excluding the 'password' field)
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

// Sample code on the client-side (Front-end application) for /getuser route

// const fetchUserProfile = async () => {
//     // Get the JWT token from the client-side storage
//     const token = localStorage.getItem('authToken');

//     // Make a GET request to the secure route with the JWT token in the headers
//     const response = await fetch('http://localhost:3000/api/auth/getuser', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'auth-token': token, // Include the JWT token in the 'auth-token' header
//         },
//     });

//     // Parse the response to get the user data
//     const user = await response.json();
//     console.log(user);
// };



// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        // console.log(lat, long)
        let location = await axios.get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                // console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                // console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n " + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

        
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

//simpy global banake database ka chij pass kr rhe as response
router.post('/foodData', async (req, res) => {
    try {
        res.send([global.foodData, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }

})


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    //to maintain list of sara orders of that date 
    // The code extracts the 'order_data' from the request body and assigns it to the variable data.
    //  It then uses the splice method to insert an object containing the order date at the beginning 
    // of the 'data' array. The order date is obtained from req.body.order_date.


    // The code queries the MongoDB collection 'Order' to find an existing document with the email specified 
    // in the request body (req.body.email). If the document is not found (eId is null), it means the user is 
    // not present in the database, and the server will handle 
    // creating a new order document. If the user exists, the server will update the existing order document.

    //if email not exisitng in db then create: else: InsertMany()
//basically history bana rhe orders ka
    let eId = await Order.findOne({ 'email': req.body.email })    
    if (eId===null) { //ni h database me user
        try {
            await Order.create({ //order model h
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

     }  //If the user does not exist in the database, the code uses the Order.create() method to create 
        // a new order document. It includes the user's email and an array containing the modified 'data' 
        // (with the order date inserted) along with the other order data. Once the document is created, 
        // the server responds to the client with a JSON object indicating the success of the operation.
    }
    else { //hai database me
        try { await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    // If the user already exists in the database, the code uses the Order.findOneAndUpdate() 
    // method to update the existing order document. It uses the $push operator to push the modified 
    // 'data' (with the order date inserted) into the 'order_data' array of the document. After the update 
    // is done, the server responds to the client with a JSON object indicating the success of the operation.
})




// order me stored sample for /myOrderData

// {
//     "orderData": {
//       "_id": "614f6f44889ac23e8b7443e6",       (unique id khud laga leta hai)
//       "email": "john@example.com",
//       "orderData": [
//         { "id": 1, "name": "Pizza", "price": 12.99 },
//         { "id": 2, "name": "Burger", "price": 8.49 },
//         { "id": 3, "name": "Salad", "price": 6.99 }
//       ],
//       "__v": 0
//     }
//   }
router.post('/myOrderData', async (req, res) => {
    try {
        //dekho order database h usme ek schema hai and array of objects toh usme vo wala array element(object) return kro 
        // jiska mail === to this mail given
        let eId = await Order.findOne({ 'email': req.body.email })
    //agr vo email id exist krta hai database me toh hi uska order history dikha skte agr kch nhi v order kiya hoga toh empty array
    //vo object ko orderData ke equal krke response send kr diye
        res.json({orderData:eId})
       
        // The reason why developers often use a new object (in this case, { orderData: eId }) instead of directly sending eId
        //  in the response is related to data security and data management practices. Here are some key points to consider:

        
        // When the server receives a request to this route, it processes the request and retrieves the order data associated with the
        //  specified email (if found). 
        // After retrieving the eId variable, it sends the response using res.json({ orderData: eId }).
      
    } 
    catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router