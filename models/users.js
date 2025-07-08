const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    hashedPassword : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('User', userSchema);