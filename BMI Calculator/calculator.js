// Author: Isuru Abeysekara
// Description: I started self-learning fullstack web development around two weeks ago.
// These projects document what I am learning and help me apply my knowledge in practical problems.


//Installing required packages for backend

const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded ({
  extended: true
}));


// Defining get function to handle client side requests
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

// Defining post function to handle server side communication
app.post("/index.html", function(req, res) {
  var num1= Number(req.body.num1);
  var num2= Number(req.body.num2);
  var result= num1/ (num2*num2);

  res.send("Your BMI is: " + result);
});

// Server listening to connections on local host
app.listen(3000, function() {
  console.log("Server started on port 3000");
})
