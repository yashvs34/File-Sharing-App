const jwt = require("jsonwebtoken");
const {findUser} = require('../repository/userRepository');

async function validateToken (req, res, next)
{
    try
    {
        const token = req.body.token;
    
        if (!token)
        {
            return res.json({
                message : "User not signedin"
            });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const userName = decoded.userName;
    
        const user = await findUser({userName});
        
        if (!user)
        {
            return res.json("Invalid user");
        }
    
        req.body.userName = userName;
        next();
    }
    catch (error)
    {
        console.log("Error while validating token", error);
        res.send("Some error occurred");
        return;
    }
}

module.exports = validateToken;