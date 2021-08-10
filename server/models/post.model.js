const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    text:{
        type: String,
        required:[true,"please add text"],
        minlength:[1,"The post should be at least 1 character"]
    },
    channel:{
        type: String,
        enum:['Shuriken','Sawwah'],
        default:"Shuriken"
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    comments:[{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }]

}, {timestamps: true});

module.exports.Post = mongoose.model('Post',PostSchema);