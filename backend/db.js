const mongoose = require('mongoose')
//The mongoURI variable contains the connection string for connecting to the MongoDB Atlas cluster. It includes the username, password, cluster URL, and database name.
const mongoURI ='mongodb+srv://InstaFood:InstaFood@cluster0.vei121k.mongodb.net/InstaFood'
//This code exports a function that takes a callback as an argument. The function is responsible for establishing a connection to the MongoDB Atlas cluster and fetching data from two collections: food_items and food_categories.
module.exports = function (callback) {
// Code to connect to MongoDB and fetch data will be here
mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//In this part, the mongoose.connect method is used to establish a connection to the MongoDB Atlas clusterspecified in the mongoURI variable. If the connection is successful, the code inside the else block will beexecuted.
        if (err) console.log("---" + err)
        else {
            console.log("connected to mongo")

            const foodCollection = await mongoose.connection.db.collection("food_items");
//Once the connection is successful, the code fetches data from the "food_items" collection using the foodCollection.find({}) method. It retrieves all documents (data) from the collection and converts them into an array. The results are then passed to the data variable.
            foodCollection.find({}).toArray(async function (err, data) {

// find({}): This is the query method used to retrieve data from the "categoryCollection." In this case, the query is empty {}, which means it will match all documents in the collection. If you were to provide a filter inside the curly braces, it would selectively retrieve documents based on specific criteria.

                const categoryCollection = await mongoose.connection.db.collection("food_categories");
//Similar to fetching data from the "food_items" collection, the code fetches data from the "food_categories" collection using the categoryCollection.find({}) method. It retrieves all documents (category data) from the collection and converts them into an array. The results are then passed to the Catdata variable. Finally, the callback function is called with the data and Catdata as arguments.
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                })
                
            });
        }
    })
};

//Note: The callback function is expected to be provided when this module is used. It's meant to handle the data once it's fetched from the database.

//The code provided fetches this data from the respective collections and passes it to the callback function, where it can be used as needed.



// categoryCollection: This is likely a reference to a MongoDB collection called "categoryCollection." In MongoDB, a collection is a group of documents (similar to rows in a table in a relational database) that share a common schema. It is where the data is stored.

// toArray(): This is a method that converts the result of the find query into an array of documents. In MongoDB, the find method returns a cursor, and calling toArray() on that cursor will convert the cursor's results into an array of documents that can be further processed.