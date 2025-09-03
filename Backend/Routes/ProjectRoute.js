const express=require('express');
const router=express.Router();
const Project=require('../Models/ProjectModel')
const upload=require('../multer')


router.get('/',async(req,res)=>{
    const pro=await Project.find({ishidden:false})
    res.json(pro)
})

router.post('/',upload.fields([
    {name:'cover',maxCount:1},
    {name:'images',maxCount:10}]),async(req,res)=>{
    const {title,description,createdAt,technologies,role,url}=req.body
    const cover = req.files?.cover?.[0]?.filename;
    const images = req.files?.images?.map(file => file.filename);
    const pro=new Project({
        title,
        description,
        createdAt,
        technologies,
        role,
        cover,
        images,
        url

    })
    await pro.save()
    res.json(pro)
})

router.patch('/:id',upload.fields([
    {name:'cover',maxCount:1},
    {name:'images',maxCount:5}]),async(req,res)=>{
        const updateData={
            title:req.body.title,
            description:req.body.description,
            createdAt:req.body.createdAt,
            technologies:req.body.technologies,
            role:req.body.role,
            url:req.body.url
        }
        if (req.files.cover && req.files.cover.length > 0) {
        updateData.cover = req.files.cover[0].filename;
        }

        if (req.files.images && req.files.images.length > 0) {
            const newImages = req.files.images.map(file => file.filename);
            const existingProject = await Project.findById(req.params.id);
            updateData.images = [...(existingProject.images || []), ...newImages];
        }

        const updateProject=await Project.findByIdAndUpdate(req.params.id,updateData,{new:true})
        res.json(updateProject)

    })

    router.patch('/delete/:id',async(req,res)=>{
        const project=await Project.findByIdAndUpdate(
            req.params.id,
            {ishidden:true},
            {new:true})
            res.json(project)
    })

module.exports=router