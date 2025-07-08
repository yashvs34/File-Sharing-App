
async function validateToken (req, req, next)
{
    const token = req.body.token;

    if (!token)
    {
        return res.json("User not signedin");
    }

    const decoded = await jwt.verify(alreadySignedin, process.env.JWT_SECRET);

    const userName = decoded.userName;

    const user = await findUser({userName});
    
    if (!user)
    {
        return res.json("Invalid user");
    }

    req.body.userName = userName;
    next();
}

module.exports = validateToken;