const { sendForgotPasswordEmail } = require('../services/emailServices');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');


const handleForgotPassword = async (req,res) => {

    const {email} = req.body;
    const user = await Users.findOne({where : {email}});

    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    const token = jwt.sign({ userId: user.id }, 'resetSecret', { expiresIn: '15m' });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    try {
        await sendForgotPasswordEmail(email, resetLink);
        res.status(200).json({ message: 'Reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send email' });
    }

};

module.exports = {
    handleForgotPassword
}