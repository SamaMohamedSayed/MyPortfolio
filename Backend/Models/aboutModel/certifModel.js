const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    icon: { type: String },
    title: { type: String, required: true },
    year: { type: Date },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
