const db = require('../util/db-connection');
const Users = require('../models/users')
const path = require('path');

const getSignUpPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
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

const getLoginPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}

const getUserDetails = async (req,res) => {
    
    try{

        const{email,password} = req.body;
        const user = await Users.findOne({where : {email : email}});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        if(user.password != password){
            return res.status(401).json({message:"Incorrect Password"});
        }
        
            res.status(200).json({message:"user found succcessfully",user});
    }catch(error){
         console.log(error);
         res.status(500).json({message:"internal server error"});
    }
}

module.exports = {
    getSignUpPage,
    postUserDetails,
    getLoginPage,
    getUserDetails
}