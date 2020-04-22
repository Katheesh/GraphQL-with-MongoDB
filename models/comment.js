const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const commentSchema =  new Schema({
    comment: String,    
    blog_id: String,
    user_id: String,
    type: Boolean, 
    status: Boolean,    
    posted_at: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);