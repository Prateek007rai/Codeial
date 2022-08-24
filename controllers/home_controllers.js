//module.exports.action_name = function(req ,res){}


// module.exports.home = function(req , res){
//     return res.end('<h1>Express is up for codeial</h1>'); 
// };

module.exports.home = function(req , res){
    // console.log(req.cookies);                 fetch cookie from server
    // res.cookie('user_id' , 95);               we can change the value of cookie at server side
    return res.render('home',{
        title: "Home"
    }) 
};