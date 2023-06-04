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

router.delete('/:title', (req, res) => {
    try{
        Song.deleteOne({ title: req.params.title });
    }catch(err){
        throw new Error(err);
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

router.put('/update', (req, res) => {
    console.log(req.body);

    try{
        Song.updateOne({ _id: req.body._id }, req.body);
    }catch(err){
        throw new Error(err);
    }
});

module.exports = router;