const UserSchema = require('./../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerController = async (req,res,next) => {
    try{
        const { name, email, password } = req.body;
        // Checking all the fields are not empty
        if(!name || !email || !password){
            res.status(400).json({
                success : false,
                message : "All feilds are required!"
            });
        }
        // Check already existing user
        const user = await UserSchema.findOne({email: email});
        if(user){
            res.status(400).json({
                success : false,
                message : "User Already Exists!"
            });
        }else{
            // adding salt and hashing the password
            bcrypt.genSalt(10 , (err,salt) => {
                if(err){
                    throw err;
                }
                bcrypt.hash(password,salt, async (err,hash) => {
                    if(err){
                        throw err;
                    }
                    const hashed_password=hash;
                    
                    // Creating new user
                    const newUser = await UserSchema.create({name:name , email:email , password:hashed_password});
                    
                    // Creating JWT token
                    jwt.sign(
                        {id:newUser._id},
                        process.env.JWT_SECRET,
                        {expiresIn : 3600},
                        (err,token) => {
                            if(err){
                                throw err;
                            }
                            //Sending res
                            res.status(201).json({
                                success : true,
                                data : {
                                    _id:newUser._id,
                                    name:newUser.name,
                                    email:newUser.email
                                },
                                message : "User Registered Successfully!",
                                token : token
                            });
                        }
                    )
                });
            });
        }
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            success : false,
            message : "Internal server error!"
        });
    }
}