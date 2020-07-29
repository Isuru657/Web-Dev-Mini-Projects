//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolist", {useNewUrlParser: true});

const todoSchema = {
  name: String
}


const todolistItems= mongoose.model("todolistItem", todoSchema);

const app = express();

const item1= new todolistItems({
  name: "Work"
});
const item2= new todolistItems({
  name: "Eat"
});
const item3= new todolistItems({
  name: "Play hard"
});

const updatedItems= [item1, item2, item3];


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

  todolistItems.find({}, function(err, foundItems){
    if (foundItems.length===0){
      todolistItems.insertMany(updatedItems, function(err){
        if (err){
          console.log(err);
        }
        else {
          console.log("Successfully added to the database");
        }
      res.redirect("/");
    })
    }
    else {
      res.render("list", {listType: day, newListItems: foundItems});
    }
  })


});

app.post("/", function(req, res){
  var item= req.body.newItem;
  var list= req.body.listType;



  if (req.body.list=="Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    const newtoDo= new todolistItems({
      name: item;
    }
    )
    newtoDo.save();
    })
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
