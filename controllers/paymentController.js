
const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Payments = require('../models/payment')
const { createOrder,getPaymentStatus } = require('../services/cashfreeService');
const path = require('path');
const jwt = require('jsonwebtoken');


const processPayment = async (req,res) => {

    const orderId = "ORDER-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerId = "1";
    const customerPhone = "9999999999";

    try{
        //create order in cashfree and generate payment session ID.

        const paymentSessionId = await createOrder(
            orderId,
            orderAmount,
            orderCurrency,
            customerId,
            customerPhone
        );

       //save payment details into database.
       await Payments.create({
          orderId,
          paymentSessionId,
          orderAmount,
          orderCurrency,
          paymentStatus : "pending",
       });

       res.json({paymentSessionId,orderId});
    
    } catch(error){
        console.log(error);
        res.status(500).json({message : "error processing payment"});
    }
}

const paymentStatus = async (req,res) => {
    
    const {orderId} = req.params;
    
    try{

        const orderStatus = await getPaymentStatus(orderId);
        await Payments.update(
            { paymentStatus: orderStatus },            
            { where: { orderId: orderId } }             
          );
          const payment = await Payments.findOne({ where: { orderId } });
        // res.json({orderStatus: orderStatus});
        res.send(`
            <h2>Payment Status</h2>
            <p>Order ID: ${payment.orderId}</p>
            <p>Status: ${payment.paymentStatus}</p>
            <p>Amount: ₹${payment.orderAmount}</p>
          `);

    } catch(error){
        console.log(error);
    }
}

const handleWebhook = async (req,res) => {

    try{

        const orderId = req.body.data.order.order_id;
        console.log(JSON.stringify(req.body, null, 2));
        const orderStatus = req.body.data.payment.payment_status;
        

        await Payments.update(
            
            {paymentStatus : orderStatus},
            {where : {orderId}}
        );

        console.log(`Webhook updated status for ${orderId}: ${orderStatus}`);
        res.status(200).json({message : orderStatus});

    } catch(error){
        console.error("Error in webhook:", error);
        res.status(500).json({message : "Webhook processing error"});
    }
}

module.exports = {
    processPayment,
    paymentStatus,
    handleWebhook
    
}