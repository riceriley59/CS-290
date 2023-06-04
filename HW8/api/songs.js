const router = require('express').Router();
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
        console.log(req.params.genre);
        let songs = await Song.find( { genre : { $eq: `${req.params.genre}` } } );

        res.json(songs);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;