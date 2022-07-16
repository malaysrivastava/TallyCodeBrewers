const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    Qname:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    byName:{
        type:String,
        required:true,
    },
    byId:{
        type:String,
        required:true
    },
    MCQ:{
        type:Array,
        default:[]
    },
    text:{
        type:Array,
        default:[]
    },
    userAttempted:{
        type:Array,
        default:[]
    },
    start:{
        type:Date,
        default:new Date().getTime()
    },
    end:{
        type:Date,
        default:new Date().getTime()
    },
    token:{
        type:String,
        default:''
    }
},{timestamps:true})

module.exports = mongoose.model('Quiz',quizSchema);