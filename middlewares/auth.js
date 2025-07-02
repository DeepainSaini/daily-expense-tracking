const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const authenticate = async (req,res,next) => {

    try{
        const token  = req.header('Authorization');
        console.log("token: ",token);
        const user = jwt.verify(token,'secretkey');
        console.log("user: ",user);
        await Users.findByPk(user.userId).then((user)=>{
            req.user = user;
            next();
        })

    }catch(error){
        console.log(error);
        res.status(400).json({status : false});
    }
}

module.exports = {
    authenticate
}