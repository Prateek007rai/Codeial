const express = require('express');

const router = express.Router(); 
const usersController = require('../controllers/users_controller');


router.get('/profile' , usersController.profile);

router.get('/Sign-In' , usersController.signIn);
router.get('/Sign-Up' , usersController.signUp);    

router.post('/create' , usersController.create);                  // not get requet use post
router.post('/create-session' , usersController.createSession);

module.exports = router;