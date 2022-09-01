const passport = require('passport');


const LocalStrategy = require ('passport-local').Strategy;

const User = require('../models/user');


//authentication using passport
// passport.use(new LocalStrategy(
//     {
//         usernameField: 'email'  ,                                           //usernameField is a keyword used to detect schema data from db.
//         passReqToCallback: true
//     } ,
//         // find a user & established a identity
//         function(req,email, password, done) {                                     // here done is callback fun who reports to passport.js middleware
//             User.findOne({ email : email}, function (err, user) {
//                 console.log("commit" ,user);
//               if(err){ 
//                 console.log('Error in finding user --> Passport'); 
//                 return done(err); 
//             }

//               if (!user || user.password != password) { 
//                 console.log('Invalid Username/Password');
//                 return done(null, false); 
//             }

            

//               return done(null, user);
//             });
//         }

// ));


passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true 
    },
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email},function(err,user){
            if(err){
               
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password != password){
               
                req.flash('error','Invalid Username/Password')
                return done(null, false);
            }
            return done(null,user); 
        });
    }
));




// serialising the user to decide which key have to be kept in the cookies
passport.serializeUser(function(user , done){
    done(null ,user.id);
});


// // De-serialising the user from the key in the cookies
passport.deserializeUser(function(id , done){
    User.findById(id ,function(err ,user){
        if (err) { console.log('Error in finding user --> Passport'); return done(err); }

        return done(null , user);
    });
});


//check if user is authenticated 
passport.checkAuthentication = function(req ,res ,next){

    //if user is sign in , then pass on the request to the next
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/Sign-In');
}


passport.setAuthenticatedUser = function(req ,res ,next){

    //req.user contains the current signed in user from cookies   ----> sending this to locals for the views
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        console.log(req.user);
    }

    //if user is not signed in
    // return res.redirect('/users/Sign-In');
    next();
}




module.exports = passport ;