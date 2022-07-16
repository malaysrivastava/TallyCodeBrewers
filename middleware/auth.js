const jwt = require('jsonwebtoken')


 function auth(req,res,next) {
    const token =req.headers[ "x-auth-token" ];
    if (token) {
        return jwt.verify(token, process.env.JWT_SIGNIN_KEY, (err, user)=> {
            if (err) {
                console.log(err)
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                });
            }
            req.user = user;
            return next();
        });
    }
    return res.status(400).json({msg:'Token authorization failed'});
     
 }

 function authAdmin(req,res,next) {
    const token =req.headers[ "x-auth-token" ];
    if (token) {
        return jwt.verify(token, process.env.JWT_SIGNIN_KEY, (err, user)=> {
            if (err) {
                console.log(err)
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                });
            }
            if(user.isAdmin)
            return next();
            else
            return res.status(401).json({msg:'Admin access denied'})
        });
    }
    return res.status(400).json({msg:'Token authorization failed'});
     
 }



 module.exports = auth,authAdmin