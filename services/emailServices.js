const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const sendForgotPasswordEmail = async (email,resetLink) => {
    
    console.log('EMAILLLLLLLLLLLLL',email);
    const tranEmailApi = new Sib.TransactionalEmailsApi();

    await tranEmailApi.sendTransacEmail({
        
        sender : {email: 'deepainsaini111@gmail.com', name: 'Expense Tracker'},
        to : [{email}],
        subject : 'reset your password',
        htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

};

module.exports = {
    sendForgotPasswordEmail
}