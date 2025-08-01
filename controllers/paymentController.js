
const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Payments = require('../models/payment');
const Users = require('../models/users');
const { createOrder,getPaymentStatus } = require('../services/cashfreeService');
const sequelize = require('../util/db-connection');
const path = require('path');
const logger = require('../util/logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const processPayment = async (req,res) => {

    const orderId = "ORDER-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerId = "1";
    const customerPhone = "9999999999";
    const token  = req.header('Authorization');
    const decode = jwt.verify(token,`${process.env.JWT_KEY}`);
    const userId = decode.userId;
    
    const t = await sequelize.transaction();
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
       },{transaction: t});
       
       await t.commit();
       res.json({paymentSessionId,orderId});
    
    } catch(error){
        logger.error(error);
        await t.rollback();
        res.status(500).json({message : "error processing payment"});
    }
}

const paymentStatus = async (req,res) => {
    
    const {orderId} = req.params;
    const t = await sequelize.transaction();
    try{
        
        const orderStatus = await getPaymentStatus(orderId);
        console.log(orderStatus);
        await Payments.update(
            { paymentStatus: orderStatus },            
            { where: { orderId: orderId },transaction: t}             
          );
        const payment = await Payments.findOne({ where: { orderId } });
        console.log("ID",payment.userId);
        await Users.update(
            {isPremium : true},
            {where : {id : payment.userId},transaction: t}
        );
        
        await t.commit();
        res.redirect('/expense');
    
        

    } catch(error){
        await t.rollback();
        logger.error(error);
    }
}

const handleWebhook = async (req,res) => {
    
    const t = await sequelize.transaction();
    try{

        const orderId = req.body.data.order.order_id;
        console.log(JSON.stringify(req.body, null, 2));
        const orderStatus = req.body.data.payment.payment_status;
        console.log("status",orderStatus);

        await Payments.update(
            
            {paymentStatus : orderStatus},
            {where : {orderId},transaction: t}
        );

        if(orderStatus==="STATUS"){
            await Payments.update(
                { isPremium: true },
                {where : {orderId},transaction: t}
            )
        }

        console.log(`Webhook updated status for ${orderId}: ${orderStatus}`);
        await t.commit();
        res.status(200).json({orderStatus : orderStatus.toLowerCase()});

    } catch(error){
        logger.error("Error in webhook:", error);
        await t.rollback();
        res.status(500).json({message : "Webhook processing error"});
    }
}

module.exports = {
    processPayment,
    paymentStatus,
    handleWebhook
    
}