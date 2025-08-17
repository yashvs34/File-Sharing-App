const express = require('express');
const router = express.Router();
const {signupValidator} = require('../middlewares/inputValidator');
const {saveUser} = require('../repository/userRepository');
const {findUser} = require('../repository/userRepository');
const {hashPassword} = require('../service/passwordHashing');

router.post('/signup', signupValidator, async (req, res) => {
    try
    {
        const userName = req.body.userName;
        const password = req.body.password;

        const result = await findUser({userName});
        
        if (result)
        {
            res.json({
                message : 'User already exists'
            });
            return;
        }
            
        const hashedPassword = await hashPassword(password);

        await saveUser({userName, hashedPassword});
        
        res.json({
            message : 'Account created successfully'
        });
    }
    catch (error)
    {
        console.log(error);
        
        res.json({
            message : 'Error while signing up'
        });
    }
});

module.exports = router;