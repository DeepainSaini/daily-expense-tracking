const express = require('express');
const userController = require('../controllers/userController');
const userAuthentication = require('../middlewares/auth');
const router = express.Router();

console.log('entered userRoutes');
router.get('/signup',userController.getSignUpPage);
router.post('/signup',userController.postUserDetails);
router.get('/login',userController.getLoginPage);
router.post('/login',userController.getUserDetails);
router.get('/premiumStatus',userAuthentication.authenticate,userController.getPremiumStatus);

module.exports = router;