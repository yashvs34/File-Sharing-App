const express = require('express');
const router = express.Router();
const {signupValidator} = require('../middlewares/inputValidator');
const {saveUser} = require('../repository/userRepository');
const {findUser} = require('../repository/userRepository');
const {hashPassword} = require('../service/passwordHashing');

module.exports = router.post('/signup', signupValidator, async (req, res) => {
    try
    {
        const userName = req.body.userName;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const result = await findUser({userName});
        
        if (result)
        {
            res.send('User already exists');
            return;
        }
            
        const hashedPassword = await hashPassword(password);

        await saveUser({userName, hashedPassword, firstName, lastName});
        
        res.send('Account created successfully');
    }
    catch (error)
    {
        console.log(error);
        res.send('Error while signing up');
    }
});