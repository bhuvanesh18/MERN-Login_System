const UserSchema = require('./../models/userModel');

exports.homeController = async (req,res,next) => {
    try{
       const user = await UserSchema.findById(req.user.id).select('_id name email');
       return res.status(200).json({
           success : true,
           data : user,
           message : 'Authorized user data'
       });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!"
        });
    }
}