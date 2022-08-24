
const express =require('express');

const router = express.Router();
const postController = require('../controllers/posts_controller');

router.use('/images' , postController.images);

module.exports = router;


