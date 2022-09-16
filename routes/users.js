const express = require('express');
const router = express.Router(); 
const passport = require('passport');


const usersController = require('../controllers/users_controller');


router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);                 //so that directly users profile cant be reached until unless it is checked .. otherwise redirect to sign in page

router.get('/Sign-In' , usersController.signIn);
router.get('/Sign-Up' , usersController.signUp);    

router.post('/create' , usersController.create);                  // not get requet use post

//use passport as a middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect : '/users/Sign-In'}
), usersController.createSession);


router.get('/Sign-Out' , usersController.destroySession);


router.get('/auth/google' , passport.authenticate('google' ,{scope: ['profile' , 'email']}));
router.get('/auth/google/callback' , passport.authenticate('google' ,{failureRedirect : '/users/Sign-In'}) , usersController.createSession);



module.exports = router;