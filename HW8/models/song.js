const db = require('../db');

const Song = db.model("Song", {
    title: String,
    artist: String,
    popularity: {type: Number, min: 0, max: 10},
    releaseDate: {type: Date, default: Date.now()},
    genre: [ String ]
});

module.exports = Song