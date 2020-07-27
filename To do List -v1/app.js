//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items=[];
let workItems= [];

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
  var today = new Date();
  var options= {
    weekday: "long",
    day: "numeric",
    month: "long"
  }


  var day= today.toLocaleDateString("en-US", options);

  res.render("list", {listType: day, newListItems: items});
});

app.post("/", function(req, res){
  var item= req.body.newItem;
  var list= req.body.listType;

  if (req.body.list=="Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(req, res){
  var day= "Work"
  res.render("list", {listType: day, newListItems: workItems});
})

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
