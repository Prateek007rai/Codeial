const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },                                                      //this above comment is going to linked with this user below
    user: {
        type: mongoose.Schema.Types.ObjectId,                                          //this type is a refernece
         ref: 'User'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post' , postSchema);

module.exports = Post;