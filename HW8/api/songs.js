const router = require('express').Router();
const { TopologyDescription } = require('mongodb');
const Song = require('../models/song');

router.get('/', async (req, res) => {
    try{
        let results = await Song.find();
        res.json(results);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/', (req, res) => {
    try{
        const song = new Song(req.body);
        song.save();

        res.status(201).json(song);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/genres', async (req, res) => {
    try{
        let genres = await Song.distinct('genre');

        res.json(genres);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/genres/:genre', async (req, res) => {
    try{
        let songs = await Song.find( { genre : { $eq: `${req.params.genre}` } } );

        res.json(songs);
    }catch(err){
        res.status(400).send(err);
    }
});

router.delete('/delete/:title', async (req, res) => {
    try{
        let response = await Song.deleteOne({ title: req.params.title });
        res.status(200).send();
    }catch(err){
        console.log(err);
    }
});

router.get('/:title', async (req, res) => {
    try{
        let result = await Song.findOne({ title: req.params.title });

        res.json(result);
    }catch(err){
        throw new Error(err);
    }
});

router.put('/update', async (req, res) => {
    try{
        let song = req.body
        let response = await Song.updateOne({ _id: song._id }, song);
        
        res.status(200).json(song);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;