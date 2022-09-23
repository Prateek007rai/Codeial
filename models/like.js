"use strict";
const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },
    //this defines the object id of the liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    //used for define the type of liked object since this the dynamic refernce
    onModel:{
        type: String,
        required: true,
        enum: ['Post' , 'Comment']
    }
},  {

    timestamps: true

}
);


const Like = mongoose.model('Like' , likeSchema);
module.exports = Like;