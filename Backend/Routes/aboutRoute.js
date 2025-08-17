const express = require('express');
const router = express.Router();

const About = require('../Models/aboutModel/aboutModel');
const Skill = require('../Models/aboutModel/skillsModel');
const Certification = require('../Models/aboutModel/certifModel');
const Education = require('../Models/aboutModel/eduModel');
const upload=require('../multer')



// ========== ABOUT ==========
router.get('/about', async (req, res) => {
    res.json(await About.findOne());
});

router.post('/about', async (req, res) => {
    res.json(await About.create(req.body));
});

// router.put('/about', async (req, res) => {
//     const updated={aboutText:req.body.aboutText}
//     const updatedAbout=await About.findOneAndUpdate({},updated,{new :true})
//     res.json(updatedAbout)
// });
router.patch('/', async (req, res) => {
  const about = await About.findOne();
  if (!about) return res.status(404).json({ error: 'Not found' });

  const updated = await About.findByIdAndUpdate(
    about._id,
    { aboutText: req.body.aboutText },
    { new: true }
  );
  res.json(updated);
});


// ========== SKILLS ==========
router.get('/skills', async (req, res) => {
    res.json(await Skill.find());
});

router.post('/skills', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file ? req.file.filename : null;

        const skillData = {
            category: req.body.category,
            skills: [
                {
                    name: req.body.name,
                    image: imagePath 
                }
            ]
        };

        const newSkill = await Skill.create(skillData);
        res.status(201).json(newSkill);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.patch('/skills/:id',upload.single('image'),async(req, res) => {
    try {
        const id = req.params.id;
        const { category, skills } = req.body;
       
        const updatedSkill = await Skill.findById(id)
        if (updatedSkill) {
            updatedSkill.category = category;
            updatedSkill.skills = skills;
            
            await updatedSkill.save()
            res.status(201).json({message:"skill updated successfully",data:updatedSkill})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})
router.put('/skills/:id', async (req, res) => {
    res.json(await Skill.findByIdAndDelete((req.params.id),{isDeleted:true},{new:true}));
});


// ========== CERTIFICATIONS ==========
router.get('/certif', async (req, res) => {
    res.json(await Certification.find({isDeleted:false}));
});

router.post('/certif', async (req, res) => {
    const{icon,title,year}=req.body
    const certif=Certification({
        title,
        icon,
        year
    })
    await certif.save()
    res.json(certif)
});

router.patch('/certif/:id',async(req,res)=>{
    const certif=await Certification.findByIdAndUpdate(
        req.params.id,req.body,{new:true}
    )
    res.json(certif)
})

router.put('/certif/:id', async (req, res) => {
    res.json(await Certification.findByIdAndUpdate((req.params.id),{isDeleted:true},{new:true}));
});


// ========== EDUCATION ==========
router.get('/education', async (req, res) => {
    res.json(await Education.find({isDeleted:false}));
});

router.post('/education', async (req, res) => {
    const{degree,institution,graduation}=req.body
    const edu=Education({
        degree,
        institution,
        graduation
    })
    await edu.save()
    res.json(edu)
});

router.patch('/education/:id', async (req, res) => {
    res.json(await Education.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.put('/education/:id', async (req, res) => {
    res.json(await Education.findByIdAndUpdate((req.params.id),{isDeleted:true},{new:true}));
});


// ========== COMBINED ROUTE ==========
router.get('/about-data', async (req, res) => {
    try {
        const about = await About.findOne();
        const skills = await Skill.find();
        const certifications = await Certification.find();
        const education = await Education.find();

        res.json({ about, skills, certifications, education });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
