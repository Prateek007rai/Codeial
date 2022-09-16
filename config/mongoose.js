const mongoose = require('mongoose');
const { index } = require('../controllers/api/v1/posts_api');

//connect to the database
mongoose.connect('mongodb://127.0.0.1/codeial_development');


// Acquire the connection (to check if it successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to MongodB'));

//Up and Running then print message
db.once('open',function(){
         console.log('Successfully connected to db :: MongoDB');
});

module.exports = db;