const db = require('../util/db-connection');
const Users = require('../models/users')
const path = require('path');

const getLoginPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','index.html'));
}

const postUserDetails = async (req,res) =>{
   
    try{
        const{name,email,password} = req.body;
        let user = await Users.findAll({where : {email : email}});

        if(user.length === 0){
            user = await Users.create({
                name : name,
                email: email,
                password : password
            })
            res.status(201).json({message:"user created successfully",user});
        }
        else{
            res.status(409).json({message:"email already exists"});
        }
       
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getLoginPage,
    postUserDetails
}