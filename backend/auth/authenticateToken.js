const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token
  

    if(!token){
        return res.status(400).json({
            success:false,
            message:"No token provided"

        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; 
        next();
    });
}

module.exports=authenticateToken