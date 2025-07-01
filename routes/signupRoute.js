const router = express.Router();
const zod = require('zod');

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
        else
        {
            await saveUser({userName, hashedPassword, firstName, lastName});
        }
    }
    catch (error)
    {
        res.send('Some error occurred');
        console.log(error);
    }
});

module.exports = signupRoute;