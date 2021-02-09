//jshint esversion:6

require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const $ = require("jquery");
const { response } = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mattmead:" + process.env.API_PASS + "@cluster0.tg1ue.mongodb.net/resumeDB", { useNewUrlParser: true, useUnifiedTopology: true }); 

const resumesSchema = new mongoose.Schema({
    basics: Object,
    work: Array,
    education: Array,
    highlevel: Array,
    skills: Array,
    languages: Array,
    interests: Array,
    references: Array,
    continueded: Array
  });

const Resume = mongoose.model("Resume", resumesSchema);

app.get("/", function(req, res) {
    res.render("jsonCV");
})

app.route("/resumes")
.get(function (req, res) {
    Resume.find(function (err, foundResumes) {
        if (!err) {
            res.send(foundResumes[0]);
        } else {
            res.send(err);
        }
    });
});

app.get("/classic", function (req, res){
    Resume.find(function (err, foundResumes) {
        if(err){
            console.log(err);
        } else {
            res.render("classic", {resume: foundResumes[0]});
        }
    });
});

app.get("/personal", function (req, res){
    Resume.find(function (err, foundResumes) {
        if(err){
            console.log(err);
        } else {
            res.render("personal", {resume: foundResumes[0]});
        }
    });
});

app.get("/about", function (req, res) {
    
        res.render("about");
    
});

let port = process.env.PORT;
if (port == null || port == "") {
    port= 3000;
}

app.listen(port, function () {
    console.log("Server has started");
});