const User = require('../models/users');

async function saveUser ({userName, hashedPassword, firstName, lastName})
{
    const newUser = new User({userName, hashedPassword, firstName, lastName});

    return await newUser.save();
}

async function findUser ({userName})
{
    return await User.findOne({userName});
}

module.exports = {saveUser, findUser};