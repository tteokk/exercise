const express = require('express');
//const bodyParser = require ('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); //help use connect to MongoDB database

require('dotenv').config(); //environment variables in the dotemb file

//create express server, define the port that the server will be on
const app = express();
const port = process.env.PORT || 5000;

//cores middleware; allow parse JSON
app.use(cors());
app.use(express.json());

//URI (uniform resource identifier), the database UI; have to set this environment variable
const uri = process.env.ATLAS_URI;
//pass in the URI, where the database is stored; how to start connection
// flags: userNewUrlParser, useCreateIndex; MongoDB Node.js driver rewrote the tool to parse MongoDB connection strings
//new connection string parser behind a flag
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
//once connection is open, it's going to log that MongoDB database connection established successfully
connection.once('open', () => {
  console.log("MongoDB database connection established successfully!");
})

//need to be able to read/write into database
//create database schema using mongoose

//require the files, and then use them
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//importing them into here
//if user puts /exercises, it will lead them to exercisesRouter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//starts the server on certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//nodemon server