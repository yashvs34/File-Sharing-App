const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const cloudinary = require('../configs/cloudinaryConfig');
const { axios } = require('axios');
const fileTypeValidator = require('../middlewares/fileValidator');

router.post('/upload', upload.single('file'), fileTypeValidator, async (req, res) => {
    const expiry = req.body.expiry;

    if (!req.file)
    {
        res.send("No file uploaded");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type : 'auto'
    })

    fs.unlinkSync(req.file.path);
    let shortId;

    axios.get('https://url-shortner-alpha-plum.vercel.app/');

    axios.post('https://url-shortner-alpha-plum.vercel.app/shorten/', {
        url : result.url
    }).then((response) => {
        shortId = response;
    });

    const createdFile = await File.create({
        userName : req.body.userName,
        shortId,
        cloudinaryUrl : result.url,
        fileName : req.file.originalName,
        size : req.file.size,
        expiry : new Date(expiry).getTime()
    });

    res.json({createdFile});
});

module.exports = fileUploadRoute