const express = require('express');
const router = express.Router();
const signinValidator = require('../middlewares/inputValidator');
const hashPassword = require('../service/passwordHashing');
const findUser = require('../repository/userRepository');
const jwt = require('jsonwebtoken');

router.get('/signin', signinValidator, async (req, res) => {
    const alreadySignedin = req.body.token;

    const decoded = alreadySignedin ? jwt.verify(alreadySignedin, process.env.JWT_SECRET) : null;

    const userName = decoded ? decoded.userName : req.body.userName;
    const password = decoded ? decoded.password : req.body.password;

    const hashedPassword = hashPassword(password);

    const user = await findUser({userName});

    if (user.hashedPassword != hashedPassword)
    {
        res.send('Your password is incorrect');
    }
    else if (decoded)
    {
        res.send("Valid user");
    }

    const token = jwt.sign({userName, hashedPassword}, process.env.JWT_SECRET);

    res.json({
        "message" : "User signin successfull",
        token : token
    });
});

module.exports = signinRoute;