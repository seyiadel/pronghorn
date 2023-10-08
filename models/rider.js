const mongoose = require('mongoose')


const riderInfo = mongoose.Schema({
    // Image Field
    dateOfBirth: {type:Date},
    userID:{type:mongoose.Types.ObjectId, ref:'User'},
    isNINVerified:{type:Boolean, default:'false'},

})
