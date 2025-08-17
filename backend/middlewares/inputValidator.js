const zod = require('zod');

const signupSchema = zod.object({
    userName : zod.string(),
    password : zod.string().min(8)
});

const signinSchema = zod.object({
    userName : zod.string(),
    password : zod.string().min(8)
});

function signupValidator(req, res, next)
{
    const userName = req.body.userName;
    const password = req.body.password;
    
    const result = signupSchema.safeParse({userName, password});

    if (!result.success)
    {
        res.json({
            message : 'Invalid inputs'
        });
    }

    next();
}

function signinValidator(req, res, next)
{
    const userName = req.body.userName;
    const password = req.body.password;

    const result = signinSchema.safeParse({userName, password});

    if (!result.success)
    {
        res.json({
            message : 'Invalid inputs'
        });
        return;
    }

    next();
}

module.exports = {signupValidator, signinValidator};