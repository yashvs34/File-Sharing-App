const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const cloudinary = require('../configs/cloudinaryConfig');
const axios = require('axios');
const File = require('../models/file');
const fileTypeValidator = require('../middlewares/fileValidator');
const validateToken = require('../middlewares/tokenValidator');

module.exports = router.post('/upload', validateToken, upload.single('file'), fileTypeValidator, async (req, res) => {
    try
    {
        const expiry = req.body.expiry;

        if (!req.file)
        {
            res.send("No file uploaded");
            return;
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type : 'auto'
        });

        fs.unlinkSync(req.file.path);
        
        await axios.get('https://url-shortner-s1t7.onrender.com');
        
        const response = await axios.post('https://url-shortner-s1t7.onrender.com/shorten', {
            url : result.url
        });
        
        const shortId = response.data.shortUrl;

        console.log(req.body.userName);

        const createdFile = await File.create({ 
            userName : req.body.userName,
            shortUrl : shortId,
            cloudinaryUrl : result.url,
            fileName : req.file.originalname,
            size : req.file.size,
            createdAt : Date.now(),
            expiryAt : new Date(expiry).getTime()
        });

        res.json({createdFile});
    }
    catch (error)
    {
        console.log(error);
        res.send("Error while uploading file");
    }
});