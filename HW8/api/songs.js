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

router.post('/', async (req, res) => {
    try{
        const song = new Song(req.body);
        const result = await song.save();

        res.status(201).json(song);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;