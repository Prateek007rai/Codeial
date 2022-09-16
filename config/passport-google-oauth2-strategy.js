const passport = require('passport');
const googleStrategy = require ('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new strategy google log in
passport.use(new googleStrategy({
    clientID: "504166202153-g96e79b37h9r2p2jaa6idudvjjsh4kkk.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email:  profile.emails[0].value}).exec(function (err, user) {                        ///find  a user
        if(err){ console.log('Error in google startegy passport' ,err); return ;}

        if(user){                                                                               //if found set this user as req.user
            return done(null, user);
        }else{
            User.create({                                                                             //if user does not exist hen create the user
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),                                      //this generates a raNDOM PASSWORD FOR EVERY USERS
            }, function (err, user) {
                if(err){ console.log('Error in creating user' ,err); return ;}

                return done(null, user);
              }
            );
        }
    });
}));



module.exports = passport;