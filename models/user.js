const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        default:''
    },
    picture:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);