const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    shortUrl : {
        type : String,
        required : true,
        unique : true
    },
    cloudinaryUrl : {
        type : String,
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
        required : true,
        default : false
    }
});

module.exports = mongoose.model('File', fileSchema);
