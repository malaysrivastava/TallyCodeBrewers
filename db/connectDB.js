const mongoose  =  require("mongoose")
require('dotenv').config()

module.exports =  connect = async ()=>{
    try{
        const response = await mongoose.connect(process.env.DATABASE ,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("DB connection established..")
    }catch(error){
        console.log('Error in connecting to MongoDB',error)
    }
}