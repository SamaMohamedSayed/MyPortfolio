const express=require('express')
const Contact=require('../Models/contactModel')
const router=express.Router()

router.get('/',async(req,res)=>{
    const contact=await Contact.find({ isHidden: false })
    res.json(contact)
})

router.post('/',async(req,res)=>{
    const {name,email,mobile,subject,msg}=req.body
    const contact=new Contact({
        name,
        email,
        mobile,
        subject,
        msg
    })
    await contact.save()
    res.json(contact)
})

router.patch('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isHidden: true },
    { new: true });
    res.json(contact);
});


module.exports=router