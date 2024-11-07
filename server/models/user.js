const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new mongoose.Schema({
    username:{type:String ,unique:true , required:true},
    name:String,
    username:String,
    password:String
});
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;
