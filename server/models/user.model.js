const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
//
// const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Username should be added"],
        minlength: [5, "Username must be at least 5 characters"]
        },
    picture:{
        type: String
    },
    email:{
      type: String
    },
    age:{
        type: Number,
        required: [true, "Please add your age"]
    },
    gender:{
        type: String,
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
        type: mongoose.Schema.Types.ObjectId, ref: 'Trip'
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }],
}, {timestamps: true});


UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

UserSchema.pre('validate', function(next) {
  console.log(this.password + " --------------- " + this.confirmPassword)
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
module.exports.User = mongoose.model('User',UserSchema);

// const bcrypt = require('bcrypt');
// const payload = {
//     id: user._id
// };

  // notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);
