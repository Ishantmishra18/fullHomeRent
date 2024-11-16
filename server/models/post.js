const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:String,
    address:String,
    cover:{type:String, default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s'},
    photos:[String], //arrays of string
    des:String,
    prize:Number,
    owner:{type:mongoose.Schema.Types.ObjectId , ref:'User'}
});
const PostModel = mongoose.model('Post', postSchema)
module.exports = PostModel;
