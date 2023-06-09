//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const ejs = require("ejs");
const { forEach } = require("lodash");
var _=require("lodash");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"dairyDB",
}).then(()=> console.log("Database connected")).catch((e)=>console.log(e));


const dairySchema=new mongoose.Schema({
  title:String,
  content:String
});

const Moment=mongoose.model("moment",dairySchema);

const Home=new Moment({
  title:"Home",
  content:"homeStartingContent"
});
Home.save();








const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";





app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){
  Moment.find(function(err,moments){
    if(!err){
      if(moments.length===0){
        Moment.insertMany(Home,function(err){
          if(err){
            console.log(err);
        }
        else{
            console.log("successfully inserted!!")
        }
        })
        res.redirect("/");
      }else{
        res.render("home",{startingContent:moments,composeAdded:post});
      
      }
    }
  })
 


});




app.get("/about",function(req,res){
  res.render("about",{aboutContent:contactContent});
  
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


app.post("/",function(req,res){
 const newPost=new Moment({
 title: req.body.postTitle,
 content:req.body.postBody

 })
 post.push(newPost);
res.redirect("/");

})

app.get("/post/:topic",function(req,res){
  
  var newTopic=_.lowerCase(req.params.topic);
  post.forEach(function(newPost){
    var title=_.lowerCase(newPost.postTitle); 
    if(newTopic=== title){
     res.render("post",{Title:newPost.postTitle, Body:newPost.postBody});
    }
    else{
      console.log("match not found!!");
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
 
});
