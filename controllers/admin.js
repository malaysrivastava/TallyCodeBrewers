const User = require('../models/user')


 exports.allUsers = async (req,res)=>{
       let users;
       try {
           users = await User.find();
           
           return res.status(200).json(users);
       } catch (error) {
           return res.status(500).json(err);
       }
 }

