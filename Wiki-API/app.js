//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const wikiSchema = {
  title: String,
  content: String
}

const Article= mongoose.model("article", wikiSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//////////////////////////////////////////////// HTTP Verbs for all articles ////////////////////////////////

app.route("/articles").get(function(req, res){
  Article.find(function(err, foundArticles){
      if (!err){
        res.send(foundArticles); //sends articles back to client
      }
  })
}).post(function(req, res){

  const newArticle= new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("Successfully added to the databse");
      }
  })
}).delete(function(req, res){
  Article.deleteMany(function(err)){
    if (!err){
      res.send("Successfully deleted all articles");
    }
    else {
      res.send(err);
    }
  }
})
};
//////////////////////////////////////////////// HTTP Verbs for all articles ////////////////////////////////

app.route("/articles/:articleTitle").get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, result){
      if (result){
        res.send(result);
      }
      else {
        res.send("The query was unsuccessful!");
      }
    })
  }
).put(function(req, res){
  Article.update({title: req.params.articleTitle}, {title: req.body.title,
  content: req.body.content}, {overwrite: True}, function(err){
    if (!err){
      res.send("Updated successfully!");
    }
    else {
      res.send("Update unsuccessful.");
    }
  })
}).patch(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
     function(err){
      if (!err){
        res.send("Updated succesfully!");
      }
      else {
        res.send("Updated unsuccessful");
      }
    }
  )
}).delete(
  Article.deleteOne({title: req.params.articleTitle}, function(err){
    if (!err){
      res.send("Deleted successfully!");
    }
    else {
      res.send("Delete unsuccessful");
    }
  })
)




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
