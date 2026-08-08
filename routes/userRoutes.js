const express = require('express');
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController')
const userAuthentication = require('../middlewares/auth');
const router = express.Router();

console.log('entered userRoutes');
router.get('/signup',userController.getSignUpPage);
router.post('/signup',userController.postUserDetails);
router.get('/login',userController.getLoginPage);
router.post('/login',userController.getUserDetails);
router.get('/premiumStatus',userAuthentication.authenticate,userController.getPremiumStatus);
router.get('/forgotPass',userController.getForgotPassForm);
router.get('/expense/download',userAuthentication.authenticate,expenseController.downloadExpenses);
router.post('/logout',userAuthentication.authenticate,userController.userLogout);

module.exports = router;


// npx autocannon -c 20 -d 15 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc4MjkwOTY2MCwiZXhwIjoxNzgyOTk2MDYwfQ._xRRrD-3vfWXYIJyGUA58AICgMpV_AurKGpC9_kujbM" http://localhost:3000/api/expenses