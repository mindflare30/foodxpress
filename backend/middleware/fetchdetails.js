var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"
const fetch = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); //fetch use vaha header me auth token daal do
    if(!token){
        res.status(401).send({error:"Invalid Auth Token"})

    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user = data.user
        next();
        } 
    catch (error) {
        res.status(401).send({error:"Invalid Auth Token"})
    }

}
module.exports = fetch

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

