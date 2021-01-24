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