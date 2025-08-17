const express = require('express');
const router = express.Router();
const {signinValidator} = require('../middlewares/inputValidator');
const {comparePassword} = require('../service/passwordHashing');
const {findUser} = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const { findData } = require('../repository/fileSharingRepository');

router.post('/signin', signinValidator, async (req, res) => {
    try
    {
        const alreadySignedin = req.body.token;

        const decoded = alreadySignedin ? await jwt.verify(alreadySignedin, process.env.JWT_SECRET) : null;
        
        const userName = decoded ? decoded.userName : req.body.userName;
        const password = decoded ? decoded.password : req.body.password;
        
        const user = await findUser({userName});

        if (!user)
        {
            res.json({
                message : 'Invalid username'
            });
            return;
        }
        
        const match = user ? await comparePassword(password, user.hashedPassword) : null;

        if (!match)
        {
            res.json({
                message : 'Invalid password'
            });
            return;
        }
        else if (decoded)
        {
            res.json({
                message : "Valid user",
            });
            return;
        }

        const token = jwt.sign({userName, password}, process.env.JWT_SECRET);

        res.json({
            "message" : "User signin successfull",
            token : token,
        });

        return;
    }
    catch (error)
    {
        console.log(error);
        res.json({
            message : "Error while signing in"
        });
    }
});

module.exports = router;