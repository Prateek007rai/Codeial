// const Post = require('../models/post');
// const User = require('../models/user');


// //module.exports.action_name = function(req ,res){}


// // module.exports.home = function(req , res){
// //     return res.end('<h1>Express is up for codeial</h1>'); 
// // };

// // module.exports.home = function(req , res){
//     // console.log(req.cookies);                 fetch cookie from server
//     // res.cookie('user_id' , 95);               we can change the value of cookie at server side

//     // Post.find({} ,function(err , posts){
        
//     //     return res.render('home',{
//     //         title: "Codieal | Home",
//     //         posts: posts                                                    // this is added for using for loop in home.ejs

//     //     }) 
//     // })



//     //populate all the details of user for each posts    .. and extract name only in home.ejs file
// //     Post.find({})
// //     .populate('user')
// //     .populate({
// //         path: 'comments',
// //         populate: {
// //             path: 'user'
// //         }
// //     })
// //     .exec(function(err, posts){
// //         User.find({} , function(err , users){

// //             return res.render('home', {
// //                 title: "Codeial | Home",
// //                 posts:  posts,
// //                 all_users: users
// //             });
// //         })

// //     });    
// // };





// module.exports.home = async function(req , res){

//     try{
//         // populate the user of each post
//         let posts = await Post.find({})
//         .sort('-createdAt')                             //recent posted data would be near 
//         .populate('user')
//         .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
   
//        let users = await User.find({});

//         return res.render('home', {
//             title: "Codeial | Home",
//             posts:  posts,
//             all_users: users
//         })
//     } catch(err){
//         console.log('ERROR' , err);
//         return ;
//     }
   
// };








const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');





module.exports.home = async function(req , res){

    try{
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')                             //recent posted data would be near 
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate:{                            //like for comment
            path: 'likes'
        }
    }).populate('comments').populate('likes');                       //like for posts
   
       let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        })
    } catch(err){
        console.log('ERROR' , err);
        return ;
    }
   
};