const express = require('express');
const router = express.Router();
const {signinValidator} = require('../middlewares/inputValidator');
const {comparePassword} = require('../service/passwordHashing');
const {findUser} = require('../repository/userRepository');
const jwt = require('jsonwebtoken');

router.post('/signin', signinValidator, async (req, res) => {
    try
    {
        const alreadySignedin = req.body.token;

        const decoded = alreadySignedin ? await jwt.verify(alreadySignedin, process.env.JWT_SECRET) : null;
        
        const userName = decoded ? decoded.userName : req.body.userName;
        const password = decoded ? decoded.password : req.body.password;
        
        const user = await findUser({userName});
        
        const match = await comparePassword(password, user.hashedPassword);

        if (!match)
        {
            res.send('Invalid user or password');
            return;
        }
        else if (decoded)
        {
            res.send("Valid user");
            return;
        }

        const token = await jwt.sign(user, process.env.JWT_SECRET);

        res.json({
            "message" : "User signin successfull",
            token : token
        });
    }
    catch (error)
    {
        console.log(error);
        res.send("Error while signing in");
    }
});

module.exports = router;