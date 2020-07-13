const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        trim : true,
        required: [ true , 'Please enter the name' ] 
    },
    email : {
        type:String,
        trim : true,
        unique : true,
        required: [ true , 'Please enter the email' ] 
    },
    password : {
        type:String,
        required: [ true , 'Please enter the password' ] 
    },
    createdAt : { 
        type: Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('userinformations' , UserSchema);