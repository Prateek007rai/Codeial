const Post = require('../models/post');


//module.exports.action_name = function(req ,res){}


// module.exports.home = function(req , res){
//     return res.end('<h1>Express is up for codeial</h1>'); 
// };

module.exports.home = function(req , res){
    // console.log(req.cookies);                 fetch cookie from server
    // res.cookie('user_id' , 95);               we can change the value of cookie at server side

    // Post.find({} ,function(err , posts){
        
    //     return res.render('home',{
    //         title: "Codieal | Home",
    //         posts: posts                                                    // this is added for using for loop in home.ejs

    //     }) 
    // })



    //populate all the details of user for each posts    .. and extract name only in home.ejs file
    Post.find({}).populate('user').exec(function(err , posts){
        
        return res.render('home',{
            title: "Codieal | Home",
            posts: posts                                                    // this is added for using for loop in home.ejs

        }) 
    });

    
};