const express = require('express');
const passwordController = require('../controllers/PasswordController');
const router = express.Router();

console.log('ROUTE',"ENTERING PASS ROUTE");
router.post('/password/forgotpassword',passwordController.handleForgotPassword);

module.exports = router;