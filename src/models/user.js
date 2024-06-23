const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
       
    },
    tutorials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutorial'
    }]
})


module.exports = mongoose.model('User', userSchema);