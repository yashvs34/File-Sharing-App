const User = require('../models/users');

async function saveUser ({userName, hashedPassword, firstName, lastName})
{
    const newUser = new User({userName, hashedPassword, firstName, lastName});

    return await newUser.save();
}

async function findUser ({userName, hashedPassword})
{
    return await User.findOne({userName, hashedPassword});
}

async function findAlreadyExistingUser ({userName})
{
    return await User.findOne({userName});
}

module.exports = saveUser, findUser, findAlreadyExistingUser;