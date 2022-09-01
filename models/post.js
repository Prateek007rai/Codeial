const mongoose = require('mongoose');
<<<<<<< HEAD

=======
>>>>>>> a3515b9c67d5983fdf8154ec3d726d71c1af0e9c

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

<<<<<<< HEAD
const Post = mongoose.model('Post', postSchema);
=======
const Post = mongoose.model('Post' , postSchema);

>>>>>>> a3515b9c67d5983fdf8154ec3d726d71c1af0e9c
module.exports = Post;