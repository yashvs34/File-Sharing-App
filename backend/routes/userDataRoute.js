const express = require('express');
const router = express.Router();
const { findData } = require("../repository/fileSharingRepository");
const validateToken = require('../middlewares/tokenValidator');

router.post('/user', validateToken, async (req, res) => {
    try
    {
        const userName = req.body.userName;
        const user = await findData({userName});

        res.send(user);
    }
    catch (error)
    {
        console.log("Error while fetching user data", error);
    }
});

module.exports = router;