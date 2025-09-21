const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String },
    date: { type: String },
    description:{type:String},
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
