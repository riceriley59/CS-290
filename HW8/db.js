/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//export environment variables so we can connect to the DB
require('dotenv').config();

//import mongoose which is a nodeJS ORM for Mongodb
//then connect to the db giving the connection string 
//from our environment variable
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTIONSTRING);

//export the new connection so that a model can be made from this
//connection
module.exports = mongoose;