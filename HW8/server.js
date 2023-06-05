/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//import express and our environment variables
const express = require('express');
require('dotenv').config();

//initialize our express app, by calling the express constructor
const app = express()

//setup our middleware to server our static files in the public folder
//and to allow HTTP requests with JSON body
app.use(express.static("public"));
app.use(express.json());

//make our app use our routes we setup in the api/songs.js folder
//and make the routes relative to /api/songs
app.use("/api/songs", require('./api/songs'));

//use port specified in environment variable althoug if it isn't
//initialized or can't be found make 300 our default port
let port = process.env.PORT || 3000

//start server and listen on port specified above
app.listen(port, () => {console.log(`started server on port: ${port}`)});