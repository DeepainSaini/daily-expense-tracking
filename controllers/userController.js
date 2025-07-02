const db = require('../util/db-connection');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const path = require('path');
const jwt = require('jsonwebtoken');

const getSignUpPage =  (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
}

const postUserDetails = async (req,res) =>{
   
    try{
        const{name,email,password} = req.body;
        let user = await Users.findOne({where : {email : email}});

        if(!user){
            const hashedPassword = await bcrypt.hash(password,10);
            user = await Users.create({
                name : name,
                email: email,
                password : hashedPassword
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

function generateAccessToken(id){
    return jwt.sign({userId : id},'secretkey');
}

const getUserDetails = async (req,res) => {
    
    try{

        const{email,password} = req.body;
        const user = await Users.findOne({where : {email : email}});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({message:"Incorrect Password"});
        }
        
        res.status(200).json({message:"user found succcessfully",token : generateAccessToken(user.id)});

    }catch(error){
         console.log(error);
         res.status(500).json({message:"internal server error"});
    }
}

const getPremiumStatus = async (req,res) => {

    try{
        console.log("USER:",req.user);
        const isPremium = req.user.isPremium;

        res.status(200).json({isPremium : isPremium});


    } catch(error){
        console.log(error);
        res.status(500).json({message : "Internal server error"});
    }
}



module.exports = {
    getSignUpPage,
    postUserDetails,
    getLoginPage,
    getUserDetails,
    getPremiumStatus

}