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
    gitHub:{type:String},
    linkedin:{type:String},
    gmail:{type:String},
    facebook:{type:String}

})

const Home=mongoose.model("homePage",homeSchema)
module.exports={Home}








