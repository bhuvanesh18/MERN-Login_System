const UserSchema = require('./../models/userModel');
const bcrypt = require('bcrypt');

exports.updatePasswordController = async (req,res,next) => {
    try{
        const { currentPassword, newPassword, confrimNewPassword } = req.body;
        // Checking all the fields are not empty
        if(!currentPassword || !newPassword || !confrimNewPassword){
            return res.status(400).json({
                success : false,
                message : "All feilds are required!"
            });
        }
        if(newPassword!==confrimNewPassword){
            return res.status(400).json({
                success : false,
                message : "New password and confrim password does not matched!"
            });
        }
        // Verifying user by Checking user's password
        const user = await UserSchema.findById(req.user.id).select('password');
        if(user.password){
            bcrypt.compare(currentPassword , user.password , async (err,isMatch) => {
                if(err){
                    throw err
                }
                if(!isMatch){
                    return res.status(400).json({
                        success : false,
                        message : "Password Incorrect!"
                    });
                }else{
                    //password matched , so update the user with new password

                    // adding salt and hashing the password
                    bcrypt.genSalt(10 , (err,salt) => {
                        if(err){
                            throw err;
                        }
                        bcrypt.hash(newPassword,salt, async (err,hash) => {
                            if(err){
                                throw err;
                            }
                            const hashed_password=hash;
                            const updatedUser = await UserSchema.updateOne({_id:req.user.id} , {$set : {password:hashed_password}});
                            if(updatedUser.ok===1){
                                return res.status(200).json({
                                    success : true,
                                    message : "Password Updated Successfully!"
                                });
                            }else{
                                return res.status(400).json({
                                    success : false,
                                    message : "Sorry could not update!"
                                });
                            }
                        });
                    });
                }
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "No user found!"
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