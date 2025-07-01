const bcrypt = require('bcrypt');
const saltRounds = 12;

function hashPassword (password)
{
    bcrypt.hash(password, saltRounds, (err, result) => {
        if (!err)
        {
            return result;
        }

        console.log('Error while hashing password', err);
    });
}

module.exports = hashPassword;