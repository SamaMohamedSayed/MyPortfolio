const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },
    skills: [
        {
            name: { type: String, required: true },
            image: { type: String }
        }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
