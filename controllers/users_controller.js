const User =require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req , res , function(err){
                if(err){ console.log('******Multer Error:' , err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));     //unlinkSync is used to delete
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            });

        }catch(err){
            req.flash('error' , err);
            return res.redirect('back');
            }
    }else{
        req.flash('error' , 'unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

 //render the sign Up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up' , {
        title: "Codeial | Sign Up"
    })
}


//render the sign in page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in' , {
        title: "Codeial | Sign In"
    })
}



//get the sign up data
module.exports.create = function(req ,res){
    if(req.body.password != req.body.confirm_password) {                                   //check password and  confirm psw are equal or not
       return res.redirect('back');
    }

    User.findOne({email: req.body.email} , function(err , user){
        if(err){console.log('error during signup'); return;}

        if(!user){                                                         //if not an existing user then create a new schema for it
            User.create(req.body , function(err , user){
                if(err){console.log('error during creation a new id in signup'); return;}

                return res.redirect('/users/Sign-In')
            })
        } else {                                                                   //if email is already present in db
            return res.redirect('back');
        }
    });
 }

// sign In data & create a session for the user
module.exports.createSession = function(req ,res){

    req.flash('success' , 'Logged in successfully');
    return res.redirect('/');

};


//sign out steps
module.exports.destroySession =  function(req, res , next) {

    
    req.logout(function(err) {
        if (err) { return next(err); }
        else{
            req.flash('success' , 'You are Logged out');
            return res.redirect('/');
        }
      });
       
}