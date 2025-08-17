const express=require('express')
const {Service}=require('../Models/serviceModel')
const router=express.Router()

router.get('/',async(req,res)=>{
    const service=await Service.find()
    res.json(service)
})

router.post('/',async(req,res)=>{
    const{msg,description,title,icon}=req.body
    const service=Service({
        msg,
        title,
        description,
        icon
    })
    await service.save()
    res.json(service)
})

router.patch('/:id',async(req,res)=>{
    const service=await Service.findByIdAndUpdate(
        req.params.id,req.body,{new:true}
    )
    res.json(service)
})

router.delete('/:id',async(req,res)=>{
    const service=await Service.findByIdAndDelete(req.params.id)
    res.json(service)
})

module.exports=router



























