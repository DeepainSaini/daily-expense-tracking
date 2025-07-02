const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premiumController');

router.get('/showLeaderBoard',premiumController.getLeaderBoard);

module.exports = router;
