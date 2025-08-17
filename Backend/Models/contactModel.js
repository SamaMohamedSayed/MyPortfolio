const mongoose= require('mongoose')

const contactSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:String},
    subject:{type:String},
    msg:{type:String},
    isHidden:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model('contactPage',contactSchema)

