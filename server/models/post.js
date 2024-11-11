const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:String,
    address:String,
    cover:String,
    photos:[String], //arrays of string
    des:String,
    prize:Number,
    owner:{type:mongoose.Schema.Types.ObjectId , ref:'User'}
});
const PostModel = mongoose.model('Post', postSchema)
module.exports = PostModel;
