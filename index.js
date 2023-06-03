const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3030;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/projectsDB",{useNewUrlParser: true});

const projectSchema = {

    title:String,
    imgUrl: String,
    Description: String,
    stack: String,
    link: String,
    about: String
}

const Project = mongoose.model("Project", projectSchema);

app.get("/projects",async(req,res)=>{
    try {
      const foundProjects = await Project.find({});
      res.send(foundProjects);
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/projects",async(req,res)=>{
    const foundProjects = new Project({
        title:req.body.title,
        imgUrl: req.body.imgUrl,
        Description: req.body.Description,
        stack: req.body.stack,
        link: req.body.link,
        about: req.body.about,
    });
    try {
      await foundProjects.save();
      res.send("Successfully added a project");
    } catch (error) {
      console.log(err);
    }
    
  });


  
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });