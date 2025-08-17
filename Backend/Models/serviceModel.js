const mongoose=require('mongoose')

const serviceSchema=new mongoose.Schema({
    msg:{
        type:String,
    },
    icon:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const Service=mongoose.model('service',serviceSchema)
module.exports={Service}