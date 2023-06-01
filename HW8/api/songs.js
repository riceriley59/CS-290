const router = require('express').Router();
const Song = require('../models/song');

router.get('/', (req, res) => {
    Song.find((err, songs) => {
        if(err){
            res.status(400).send(err);
        }else{
            res.json(songs);
        }
    });
});

router.post('/', (req, res) => {
    const song = new Song(req.body);
    song.save((err, song) => {
        if(err){
            res.status(400).send(err);
        }else{
            res.status(201).json(song);
        }
    });
});

module.exports = router;