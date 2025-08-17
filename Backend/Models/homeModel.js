const mongoose=require('mongoose')

const homeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String,
        required:true
    },
    cv:{type:String},
    socialLinks:{
        type:String
    }

})

const Home=mongoose.model("homePage",homeSchema)
module.exports={Home}








