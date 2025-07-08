const express = require('express');
const passwordController = require('../controllers/PasswordController');
const router = express.Router();

console.log('ROUTE',"ENTERING PASS ROUTE");
router.post('/password/forgotpassword',passwordController.handleForgotPassword);
router.get('/reset-password/:id',passwordController.getResetPassForm);
router.post('/reset-password/:uuid',passwordController.resetPassword);

module.exports = router;