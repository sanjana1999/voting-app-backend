const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let posts = new Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    upvotes:{
        type:Number,
        default: 0
    },
    downvotes:{
        type:Number,
        default: 0
    },
    upvotesid:{
        type:[String]
    },
    downvotesid:{
        type:[String]
    },
});

module.exports = mongoose.connection.model('posts', posts);
