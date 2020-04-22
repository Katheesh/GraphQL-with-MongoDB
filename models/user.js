const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const userSchema =  new Schema({
    name: String,
    email: String,
    Password: String,
    Phone: String,
    image: String,
    status: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);