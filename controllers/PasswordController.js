const { sendForgotPasswordEmail } = require('../services/emailServices');
const sequelize = require('../util/db-connection');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const PasswordReq = require('../models/forgotPassRequests');
const path = require('path');
const logger = require('../util/logger');


const handleForgotPassword = async (req,res) => {

    const {email} = req.body;
    const user = await Users.findOne({where : {email}});

    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    const id = uuidv4();
    await PasswordReq.create({
        id,
        userId : user.id,
        isactive : true
    });
    const resetLink = `http://localhost:3000/called/reset-password/${id}`;

    try {
        await sendForgotPasswordEmail(email, resetLink);
        res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    }

};

const getResetPassForm = async (req,res) =>{
    
    try{
        const requestId = req.params.id;
        const resetRequest = await PasswordReq.findOne({
            where : {id : requestId, isactive : true}
        });

        if(!resetRequest){
            return res.status(400).send('Reset link is invalid or expired.');
        }

        res.sendFile(path.join(__dirname,'../','views','resetPass.html'));

    }catch(error){
        logger.error(error);
        res.status(500).json({ message: 'Failed to get reset password page' });
    }
    
}

const resetPassword = async (req,res) => {
    
    const t = await sequelize.transaction();
    try{
        const {newPassword} = req.body;
        const {uuid} = req.params;
        
        const request = await PasswordReq.findOne({
            where : {id : uuid, isactive : true},
            transaction: t
        });

        if(!request){
            await t.rollback();
            return res.status(400).json({ message: 'Invalid or expired reset request' });
        }

        const user = await Users.findByPk(request.userId,{transaction: t});
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save({transaction: t});

        request.isactive = false;
        await request.save({transaction: t});
        await t.commit();
        res.status(200).json({ message: 'Password reset successfully' });

    }catch(error){
        logger.error(error);
        await t.rollback();
        res.status(500).json({message : "cannot update password"})
    }
}

module.exports = {
    handleForgotPassword,
    getResetPassForm,
    resetPassword
}