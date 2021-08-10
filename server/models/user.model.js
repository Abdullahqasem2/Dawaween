const mongoose = require('mongoose')
UserSchema.plugin(uniqueValidator);
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Username should be added"],
        unique: [true, "Username must be unique"],
        minlength: [5, "Username must be at least 5 characters"]
        },
    picture:{
        type: String
    },
    age:{
        type: Number,
        required: [true, "Please add your age"]
    },
    gender:{
        type: String,
        enum: ['Male','Female'],
        required: [true, "Please add your gender"]
    },
    interests:[{
        type:String,
        required: [true, "Please add your interests"]
    }],
    origin:{
        type: String,
        required: [true, "Please add your country"]
    },
    password:{
        type: String,
        required: [true, "Please add password"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    trips:[{
        type: Schema.Types.ObjectId, ref: 'Trip'
    }],
    posts:[{
        type: Schema.Types.ObjectId, ref: 'Post'
    }],
    comments:[{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }],  
}, {timestamps: true});

module.exports.User = mongoose.model('User',UserSchema);

