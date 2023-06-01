const router = require('express').Router();
const Song = require('../models/song');

router.get('/songs', (req, res) => {
    Song.find((err, songs) => {
        if(err){
            res.status(400).send(err);
        }else{
            res.json(songs);
        }
    });
});

module.exports = router;