const User =require('../models/user');

module.exports.profile = function(req ,res){
    User.findById(req.params.id , function(err , user){

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })

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

    return res.redirect('/');

};


//sign out steps
module.exports.destroySession =  function(req, res , next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        else
         return res.redirect('/');
      });
       
}