const router = express.Router();
const sendMail = require('./service/mailSender');

let emailOptions = {
    emailFrom : "yashvardhansingh232@gmail.com",
    emailTo : "vidhi.singh.parihar.2711@gmail.com",
    link : "abcd",
    fileName : "abdc",
    size : 1234
}

router.get('/send', async (req, res) => {
    try
    {
        await sendMail(emailOptions);
        res.send("Email sent successfully");
    }
    catch (error)
    {
        console.log("Error in sending mail", error);
        res.send("Some error occured");
    }
})

module.exports = sendMailRoute