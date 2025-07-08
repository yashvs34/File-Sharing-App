const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        required : true,
        unique : true
    },
    cloudinaryUrl : {
        type : String,
        required : true
    },
    fileName : {
        type : String,
        required : true
    },
    size : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        required : true
    },
    expiryAt : {
        type : Date,
        required : true
    },
    isExpired : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('File', fileSchema);
