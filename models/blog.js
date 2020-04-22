const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const blogSchema =  new Schema({
    title: String,    
    image: String,
    status: Boolean,
    content: String,
    category: String,
    tags: String,
    posted_at: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);