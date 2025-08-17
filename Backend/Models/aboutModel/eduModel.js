const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String },
    graduation: { type: String },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
