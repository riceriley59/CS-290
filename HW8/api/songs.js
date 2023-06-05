/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//This file handles the routing for the API and getting data from the
//DB. all these calls start with /api/songs/, which you can see if you
//look in my server.js file.

//import express router and our Song model
const router = require('express').Router();
const Song = require('../models/song');

//route for getting all the songs
router.get('/', async (req, res) => {
    try{
        //use Song.find() to return all song documents from DB
        //then return the results array in a json string
        let results = await Song.find();
        res.json(results);
    }catch(err){
        //if theres an error send 400 code with err message.
        res.status(400).send(err);
        console.log(err);
    }
});

//route for adding a song to the DB
router.post('/', (req, res) => {
    try{
        //song will be sent in the body of the request
        //so we create a new song with the req.body
        //content then we save it to the database.
        const song = new Song(req.body);
        song.save();

        //send content changed code and return json Song
        //so we can output the ID of the new song
        res.status(201).json(song);
    }catch(err){
        //if theres an error send 400 code with err message.
        res.status(400).send(err);
        console.log(err);
    }
});

//route for getting all distinct genres in the DB
router.get('/genres', async (req, res) => {
    try{
        //use distinct method and pass the genre field
        //to find all distinct values in the genre field
        //for the whole collection.
        let genres = await Song.distinct('genre');

        //then return the genres array as a json string
        res.json(genres);
    }catch(err){
        //if theres an error send 400 code with err message.
        res.status(400).send(err);
        console.log(err);
    }
});

//route for getting all songs with specified genre
router.get('/genres/:genre', async (req, res) => {
    try{
        //find all songs with specified genre and then return that 
        //into an array in songs
        let songs = await Song.find( { genre : req.params.genre } );

        //return songs with specific genre as json string
        res.json(songs);
    }catch(err){
        //if theres an error send 400 code with err message.
        res.status(400).send(err);
        console.log(err);
    }
});

//route for deleting song with specific title
router.delete('/delete/:title', async (req, res) => {
    try{
        //call deletOne method and pass the title that was passed in request
        let response = await Song.deleteOne({ title: req.params.title });

        //if the song was deleted then return a 200 status 
        res.status(200);
    }catch(err){
        //if there's an error log it in the server console
        console.log(err);
    }
});

//route for getting song with specific title
router.get('/:title', async (req, res) => {
    try{
        //find the song with the passed title and store it in result
        let result = await Song.findOne({ title: req.params.title });

        //then return result as a json string
        res.json(result);
    }catch(err){
        //if theres an error send 400 code with err message
        res.status(400).send(err);
        console.log(err);
    }
});

//route for updating song in the database
router.put('/update', async (req, res) => {
    try{
        //get song from the request's body and then call the updateOne
        //method searching for a document with the passed id, and then replace
        //it witth the newly passed song.
        let song = req.body
        let response = await Song.updateOne({ _id: song._id }, song);
        
        //return 200 success and the song as a json string
        res.status(200).json(song);
    }catch(err){
        //if theres an error send 400 code with err message
        res.status(400).send(err);
        console.log(err);
    }
});

//export the router object that we have added all the routes too
//so it can be imported into our server.js file and used
module.exports = router;