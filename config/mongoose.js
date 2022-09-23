const mongoose = require('mongoose');
const env = require('./envirnoment');
const { index } = require('../controllers/api/v1/posts_api');

//connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);


// Acquire the connection (to check if it successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to MongodB'));

//Up and Running then print message
db.once('open',function(){
         console.log('Successfully connected to db :: MongoDB');
});

module.exports = db;