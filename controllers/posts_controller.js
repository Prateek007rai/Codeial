//require post schema
const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');




module.exports.create = async function(req ,res){
     // Post.create({
     //      content : req.body.content,
     //      user: req.user._id
     // }, function(err ,post){
     //      if(err){console.log('Error ocurred in post controller'); return ;}

     //      return res.redirect('back');

     // });

     try{
          let post = await Post.create({
               content : req.body.content,
               user: req.user._id
          });

          if(req.xhr){
               return res.status(200).json({
                    data: {
                         post: post
                    },
                    message : 'Post Created Hurray'
               });
          }
               req.flash('success' , 'Post Created');
               return res.redirect('back');
     
     }catch(err){
          req.flash('error' , err);
          return res.redirect('back');
     }
}


module.exports.destroy = async function(req , res){
     // Post.findById(req.params.id ,function(err , post){

     //      // .id means converting ObjectID into Strings
     //      if(post.user == req.user.id){
     //           post.remove();

     //           Comment.deleteMany({post : req.params.id} , function(err){
     //                return res.redirect('back');
     //           })
     //      }else{
     //           return res.redirect('back');
     //      }
     // })

     try{
          let post = await Post.findById(req.params.id);

          if(post.user == req.user.id){


               // CHANGE :: delete the associated likes for the post and all its comments' likes too
               await Like.deleteMany({likeable: post, onModel: 'Post'});
               await Like.deleteMany({_id: {$in: post.comments}});

               
               post.remove();

               await Comment.deleteMany({post : req.params.id});

               if(req.xhr){
                    return res.status(200).json({
                         data: {
                              post_id: req.params.id
                         },
                         message : 'Post Deleted Successfully'
                    });
               }

               req.flash('success' , 'Post Deleted');
               return res.redirect('back');

     }else{
          req.flash('error' , 'You can not delete this post !!');
          return res.redirect('back');
     }
     
     }catch(err){
          req.flash('error' , err);
          return res.redirect('back');
     }

}