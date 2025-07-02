
const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Payments = require('../models/payment');
const Users = require('../models/users');
const { createOrder,getPaymentStatus } = require('../services/cashfreeService');
const path = require('path');
const jwt = require('jsonwebtoken');


const processPayment = async (req,res) => {

    const orderId = "ORDER-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerId = "1";
    const customerPhone = "9999999999";
    const token  = req.header('Authorization');
    const decode = jwt.verify(token,'secretkey');
    const userId = decode.userId;

    try{
        //create order in cashfree and generate payment session ID.

        const paymentSessionId = await createOrder(
            orderId,
            orderAmount,
            orderCurrency,
            customerId,
            customerPhone
        );

        console.log(paymentSessionId);

       //save payment details into database.
       await Payments.create({
          orderId,
          paymentSessionId,
          orderAmount,
          orderCurrency,
          paymentStatus : "pending",
          userId : userId
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
        console.log(orderStatus);
        await Payments.update(
            { paymentStatus: orderStatus },            
            { where: { orderId: orderId } }             
          );
        const payment = await Payments.findOne({ where: { orderId } });
        console.log("ID",payment.userId);
        await Users.update(
            {isPremium : true},
            {where : {id : payment.userId}}
        );
        
        res.redirect('/expense');
    
        

    } catch(error){
        console.log(error);
    }
}

const handleWebhook = async (req,res) => {

    try{

        const orderId = req.body.data.order.order_id;
        console.log(JSON.stringify(req.body, null, 2));
        const orderStatus = req.body.data.payment.payment_status;
        console.log("status",orderStatus);

        await Payments.update(
            
            {paymentStatus : orderStatus},
            {where : {orderId}}
        );

        if(orderStatus==="STATUS"){
            await Payments.update(
                { isPremium: true },
                {where : {orderId}}
            )
        }

        console.log(`Webhook updated status for ${orderId}: ${orderStatus}`);
        res.status(200).json({orderStatus : orderStatus.toLowerCase()});

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