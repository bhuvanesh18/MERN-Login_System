const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    
    // Check for token
    if(!token){
        return res.status(400).json({
            success : false,
            message : "No Token, Autorization denied!"
        });
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(400).json({
            success : false,
            message : "Token is not valid!"
        })
    }
}

module.exports = auth ;