const User =require('../models/user');

module.exports.profile = function(req ,res){

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err , user){
            if(err){console.log('error during profile view'); return;}
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                });
            }
            return res.redirect('/users/Sign-In');
        })

    }else{
        return res.redirect('/users/Sign-In');
    }
    
}

 //render the sign Up page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up' , {
        title: "Codeial | Sign Up"
    })
}


//render the sign in page
module.exports.signIn = function(req, res){

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

    // find the user

    User.findOne({email: req.body.email} , function(err , user){
        if(err){console.log('error during signIn'); return;}


    //handle the found

    if(user){                                                     
        
    //handle psw that does not matched
    if(user.password != req.body.password){
        return res.redirect('back');
    }

    //handle session creation
    res.cookie('user_id' , user.id);
    return res.redirect('/users/profile');

    } else {    
         //handle user not found                                          
         return res.redirect('back');
    }

    });

};