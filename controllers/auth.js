 const User = require('../models/user')
 const jwt = require('jsonwebtoken')
 const _ = require('lodash')
 const {OAuth2Client} = require('google-auth-library')
 const client =  new OAuth2Client(process.env.CLIENT_ID) 

 
 exports.googleLogin = (req,res)=>{
     
     const {tokenId} = req.body;
     
     client.verifyIdToken({idToken:tokenId,requiredAudience:process.env.CLIENT_ID}).then(response=>{
        const {email_verified,name,email,picture} = response.payload
        
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong..."
                    })
                } else{
                    if(user){
                          const token = jwt.sign({_id:user._id,isAdmin:user.isAdmin},'my-32-character-ultra-secure-and-ultra-long-secret',{expiresIn:'1d'})
                          const {_id, name, email} = user;

                          res.json({
                              token,
                              user:{_id, name, email,picture}
                          })
                    } else{
                        let password = email+process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({name,email,password,picture});
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    error:"Something went wrong..."
                                })
                            } 
                            const token = jwt.sign({_id:data._id},process.env.JWT_SIGNIN_KEY,{expiresIn:'7d'})
                            const {_id, name, email} = newUser;
  
                            res.json({
                                token,
                                user:{_id, name, email,picture}
                            }) 
                        })

                    }
                }
            })
        }
     })
 }