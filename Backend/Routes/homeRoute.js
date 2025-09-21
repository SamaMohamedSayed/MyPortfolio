const express=require('express')
const {Home}=require('../Models/homeModel')
const router=express.Router()
const upload=require('../multer')


router.get('/',async(req,res)=>{
    const home=await Home.find()
    res.json(home)
})

router.post('/',upload.fields([
    { name: 'userImage', maxCount: 1 },
    { name: 'cv', maxCount: 1 } 
    ]),async(req,res)=>{
        const {name,description,gitHub,linkedin,gmail,facebook}=req.body
        const img = req.files?.userImage ? req.files.userImage[0].filename : null;
        const cv = req.files?.cv ? req.files.cv[0].filename : null;
        const home=new Home({
            name,
            description,
            gitHub,
            linkedin,
            gmail,
            facebook,
            img:img,
            cv:cv
        })
        await home.save();
        res.json(home)
})

router.patch('/',upload.fields([
    {name:'img',maxCount:1},
    {name:'cv',maxCount:1}
    ]),async(req,res)=>{
    const updateData = {
            name: req.body.name,
            description: req.body.description,
            gitHub:req.body.gitHub,
            gmail:req.body.gmail,
            linkedin:req.body.linkedin,
            facebook:req.body.facebook,
        };

        if (req.files.img) {
            updateData.img = req.files.img[0].filename;
        }
        if(req.files.cv){
            updateData.cv=req.files.cv[0].filename
        }

    const updateHome = await Home.findOneAndUpdate({}, updateData, { new: true });
    res.json(updateHome);

})






module.exports=router