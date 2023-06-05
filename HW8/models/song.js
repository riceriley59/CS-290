/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//export our mongoDB connection that we made in the db.js file
const db = require('../db');

//then create a Song model within the db we
//connected to. The model represents the structure 
//of each of our song documents.
const Song = db.model("Song", {
    title: String,
    artist: String,
    popularity: {type: Number, min: 0, max: 10},
    releaseDate: {type: Date, default: Date.now()},
    genre: [ String ]
});

//export song model, so it can be used to 
//connect to and alter the DB in our files
//like our api.
module.exports = Song