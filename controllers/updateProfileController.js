const UserSchema = require('./../models/userModel');
const bcrypt = require('bcrypt');

exports.updateProfileController = async (req,res,next) => {
    try{
        const { name, email, password } = req.body;
        // Checking all the fields are not empty
        if(!name || !email || !password){
            return res.status(400).json({
                success : false,
                message : "All feilds are required!"
            });
        }
        // Verifying user by Checking user's password
        const user = await UserSchema.findById(req.user.id).select('password');
        if(user.password){
            bcrypt.compare(password , user.password , async (err,isMatch) => {
                if(err){
                    throw err
                }
                if(!isMatch){
                    return res.status(400).json({
                        success : false,
                        message : "Password Incorrect!"
                    });
                }else{
                    //password matched , so update the user with new value
                    const updatedUser = await UserSchema.updateOne({_id:req.user.id} , {$set : {name : name , email:email}});
                    if(updatedUser.ok===1){
                        return res.status(200).json({
                            success : true,
                            data : {
                                _id:req.user.id,
                                name:name,
                                email:email
                            },
                            message : "Profile Updated Successfully!"
                        });
                    }else{
                        return res.status(400).json({
                            success : false,
                            message : "Sorry could not update!"
                        });
                    }
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