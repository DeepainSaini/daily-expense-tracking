// const jwt = require('jsonwebtoken');
// const Users = require('../models/users');

// const authenticate = async (req,res,next) => {

//     try{
//         const token  = req.header('Authorization');
//         console.log("token: ",token);
//         const decode = jwt.verify(token,'secretkey');
//         const user = await Users.findByPk(decode.userID);

        
//         if(!user) {
//             return res.status(404).json({ isPremium: false });
//         }

//         res.json({isPremium : user.isPremium});


//     }catch(error){
//         console.error("JWT verification failed:", error);
//         res.status(401).json({ message: "Unauthorized", isPremium: false });
//     }
// }

// module.exports = {
//     authenticate
// }