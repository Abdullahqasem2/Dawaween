const mongoose = require('mongoose');
Schema = mongoose.Schema;
const CommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required:[true,"please add text"],
        minlength:[1,"The comment should be at least 1 character"]
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    post:{
        type: Schema.Types.ObjectId, ref: 'Post'
    }

}, {timestamps: true});

module.exports.Comment = mongoose.model('Comment',CommentSchema);
