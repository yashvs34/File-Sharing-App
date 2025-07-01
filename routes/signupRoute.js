const router = express.Router();
const signupValidator = require('../middlewares/inputValidator');
const saveUser = require('../repository/userRepository');
const hashPassword = require('../service/passwordHashing');

router.post('/signup', signupValidator, async (req, res) => {
    try
    {
        if (findAlreadyExistingUser({userName}))
        {
            res.send('User already exists');
        }
        
        const hashedPassword = hashPassword(password);

        await saveUser({userName, hashedPassword, firstName, lastName});
        
        res.send('Account created successfully');
    }
    catch (error)
    {
        console.log(error);
        res.send('Error while signing up');
    }
});

module.exports = signupRoute;