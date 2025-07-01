const router = express.Router();
const zod = require('zod');
const saveUser = require('../repository/userRepository');

const signupSchema = z.object({
    userName : zod.email(),
    hashedPassword : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post('/signup', async (req, res) => {
    try
    {
        const userName = req.body.userName;
        const hashedPassword = req.body.hashedPassword;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const result = signupSchema.safeParse({userName, hashedPassword, firstName, lastName});

        if (!result.success)
        {
            res.send('Invalid inputs');
        }
        else if (findAlreadyExistingUser({userName}))
        {
            res.send('User already exists');
        }

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