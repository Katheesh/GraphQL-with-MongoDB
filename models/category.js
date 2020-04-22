const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const categorySchema =  new Schema({  
    category: String,
    status: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);