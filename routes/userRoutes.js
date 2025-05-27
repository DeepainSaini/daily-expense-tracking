const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.get('/signup',userController.getSignUpPage);
router.post('/signup',userController.postUserDetails);
router.get('/login',userController.getLoginPage);
router.post('/login',userController.getUserDetails);

module.exports = router;