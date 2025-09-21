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

router.post('/skills', upload.array('image'), async (req, res) => {
  try {
    const { category } = req.body;
    let skills = [];

    // لو عندك skills جايين من FormData
    if (req.body.skills) {
      const skillsData = Array.isArray(req.body.skills)
        ? req.body.skills
        : [req.body.skills];

      skills = skillsData.map((s, index) => {
        const skillObj = JSON.parse(s); // جاي كـ JSON string من Angular
        return {
          name: skillObj.name,
          image: req.files[index] ? req.files[index].filename : skillObj.image // جديدة أو قديمة
        };
      });
    }

    const newSkill = await Skill.create({ category, skills });
    res.status(201).json(newSkill);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.patch('/skills/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const { category, skills } = req.body;

    const updatedSkill = await Skill.findById(id);
    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    updatedSkill.category = category;

    // skills جاي من body (stringified JSON or fields)
    if (skills) {
      updatedSkill.skills = Array.isArray(skills) ? skills : JSON.parse(skills);
    }

    // لو فيه فايل جديد مرفوع
    if (req.file) {
      updatedSkill.skills[0].image = req.file.filename;
    }

    await updatedSkill.save();
    res.status(200).json({ message: "Skill updated successfully", data: updatedSkill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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
    const{title,name,date,description}=req.body
    const edu=Education({
      title,
      name,
      date,
      description
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
