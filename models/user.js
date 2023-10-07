const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {type:String, required:true},
    lastName:{type:String, required:true},
    email: {type:String, required:true},
    phoneNumber: {type:Number, required:true, min:11},
    password: {type:String, required:true},
    role: {type:String, default:"basic"}
})

const User = mongoose.model('User', userSchema)

module.exports = User
