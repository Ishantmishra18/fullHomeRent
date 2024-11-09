const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new mongoose.Schema({
    username:String,
    name:String,
    password:String
});
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;
