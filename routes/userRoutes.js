const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.get('/',userController.getLoginPage);
router.post('/',userController.postUserDetails);

module.exports = router;