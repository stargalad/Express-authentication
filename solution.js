// Importing required modules:
import express from "express"; //Express.js for creating the server
import bodyParser from "body-parser"; //body-parser for parsing incoming request bodies
import { dirname } from "path";
import { fileURLToPath } from "url";  //  Node.js built-in modules path and url for working with file and URL paths.

//Setting up the directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

//Creating an Express application instance and setting up port
const app = express();
const port = 3000;

//Define variable to track user authorization
var userIsAuthorised = false; // user not authorized initially 

// Using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // When true, it allows parsing of objects and arrays encoded in the URL-encoded format. 

//Defining a middleware function for password check
function passwordCheck(req, res, next) {
  const password = req.body["password"]; // extracts the value of the "password" field from the request body (req.body), which contains form data submitted by the client.
  if (password === "ILoveProgramming") {
    userIsAuthorised = true; // password checking and authorize
  }
  next(); // pass control to the next middleware function in the pipeline
}
app.use(passwordCheck); // adding the passwordCheck middleware to the Express application's middleware stack. 

// Defining a route handler for the root URL ("/")
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Handling form submission with POST request
app.post("/check", (req, res) => {  // app.post() Specifies that this route handler will only handle POST requests. sets up a route handler for POST requests to the "/check" endpoint.
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/");
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
