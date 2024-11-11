const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new mongoose.Schema({
    username:String,
    cover:String,
    name:String,
    password:String,
    accommodation: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post"
        }
      ]
});
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;

