const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 4
    },
    photo: String,
    bio: String,
    isPublic: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum:['user','admin'],
        default:'user' 
    }
});

module.exports = mongoose.model('User',userSchema);