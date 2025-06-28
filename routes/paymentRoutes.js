const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// router.get('/');
router.post('/pay',paymentController.processPayment);
router.get('/payment-status/:orderId',paymentController.paymentStatus);
router.post('/webhook/cashfree', paymentController.handleWebhook);


module.exports = router;