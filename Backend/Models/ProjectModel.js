
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String },
    createdAt: { type: Date },
    technologies: [{ type: String }],
    role: { type: String }, 
    cover: { type: String, required: true },
    images: [{ type: String }],
    ishidden:{type:Boolean,default:false}
});
 
module.exports = mongoose.model('Project', projectSchema);
