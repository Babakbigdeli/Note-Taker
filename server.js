// Bringing in Dependencies

const express = require("express");
const fs = require("fs");
const path = require("path");

//Bringing in Express requirements and environmental port for Heroku 
var app = express();
var PORT = process.env.PORT || 3000;

// Setting up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up middleware to serve static files
app.use(express.static("public"));

//Defining routing to home page and notes page 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

