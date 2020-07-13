const UserSchema = require('./../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginController = async (req,res,next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All feilds are required!"
            });
        }
        const user = await UserSchema.findOne({email: email});
        if(user){
            // Validating password
            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(!isMatch) {
                        return res.status(401).json({
                            success : false,
                            message : "User credentials wrong!"
                        });
                    }
                    //Creating Jwt token
                    jwt.sign(
                        {id:user._id},
                        process.env.JWT_SECRET,
                        {expiresIn : 3600},
                        (err,token) => {
                            if(err){
                                throw err;
                            }
                            //Sending res
                            return res.status(200).json({
                                success : true,
                                data : {
                                    _id : user._id,
                                    name : user.name,
                                    email : user.email
                                },
                                message : "Login successfull!",
                                token : token
                            });
                        }
                    )
                })
        }else{
            return res.status(401).json({
                success : false,
                message : "User does not exists!"
            });
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error!"
        });
    }
}