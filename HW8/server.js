const express = require('express');
const cors = require('cors');
const Song = require('./models/song');

const app = express()

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/songs", require('./api/songs'));

app.listen(process.env.PORT, () => {console.log(`started server on port: ${process.env.PORT}`)});