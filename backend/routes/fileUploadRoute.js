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

router.post('/upload', upload.single('file'), validateToken, fileTypeValidator, async (req, res) => {
    try
    {
        const expiry = req.body.expiry;

        if (!req.file)
        {
            res.json({
                message : "No file uploaded"
            });
            return;
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type : 'raw'
        });

        fs.unlinkSync(req.file.path);
        
        await axios.get('https://url-shortner-backend.yashvs34.me');
        
        const response = await axios.post('https://url-shortner-backend.yashvs34.me/shorten', {
            url : result.url,
            clientType : 'backend'
        });
        
        const shortId = response.data.shortUrl;

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
        res.json({
            message : "Error while uploading file"
        })
    }
});

module.exports = router;