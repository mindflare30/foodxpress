//This code snippet is responsible for establishing a connection to the database and retrieving data. It seems like it's using a custom module named db to connect to the database. The db module exports a function that takes a callback as an argument. Once the connection is successful, the callback function is invoked with three parameters: err, data, and CatData.

// err: If there's an error during the database connection or data retrieval, it will be stored in this parameter.
// data: This is the retrieved data from the database, and it is assigned to the global.foodData variable.
// CatData: This seems to be the data related to food categories retrieved from the database, and it is assigned to the global.foodCategory variable.

require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;  //making global variables can be accesed 
  global.foodCategory = CatData; //global is accesible for entire backend code sharing same node.js env
})

//Setting Up Express Server:
const express = require('express')
const app = express()
const port = 5000

//CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent webpages from making requests to a different domain than the one that served the webpage. In this code snippet, the Express server is configured to allow requests from http://localhost:3000, which means it allows cross-origin requests from a frontend running on localhost and port 3000. The response headers are also configured to allow specific request headers for handling different types of data.

app.use((req, res, next) => { //this is CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//In Express.js, express.json() is a middleware function that is used to parse incoming JSON data from HTTP request bodies. Middleware functions in Express are functions that have access to the request (req) and response (res) objects, as well as the next middleware function in the application's request-response cycle. Middleware functions can perform tasks, modify the request or response objects, or terminate the request-response cycle.
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//This code snippet mounts the routes defined in the ./Routes/Auth module under the /api/auth path. This means that any routes defined in the Auth module will be accessible with a base URL of /api/auth.
app.use('/api/auth', require('./Routes/Auth'));

//The server is started by calling the listen method on the Express app, which makes it listen on port 5000. When the server starts successfully, it will log the message "Example app listening on http://localhost:5000" to the console.
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

