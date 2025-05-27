// const db = require('../util/db-connection');
const path = require('path');

const getLoginPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

const postUserDetails =  (req,res) =>{
   
    res.status(201).json({message:"user login success"});
}

module.exports = {
    getLoginPage,
    postUserDetails
}