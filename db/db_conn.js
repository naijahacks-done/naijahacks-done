const mongoose = require('mongoose');

/*** DB connection */
mongoose.connect('mongodb://localhost/greenish'); // after "localhost" your db's name follows
var db = mongoose.connection;

// Check for db connection
db.once('open', () => {
    console.log('Connecting to MongoDB...');
    console.log("Connected to MongoDB.\n");
});

// check for db errors
db.on('error', (err) => {
    console.log(err);
});