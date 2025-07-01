const router = express.Router();
const sendMail = require('./service/mailSender');

router.post('/send', async (req, res) => {
    try
    {
        const emailFrom = req.body.emailFrom;
        const emailTo = req.body.emailTo;
        const link = req.body.link;
        const fileName = req.body.fileName;
        const size = req.body.size;

        await sendMail({emailFrom, emailTo, link, fileName, size});
        res.send("Email sent successfully");
    }
    catch (error)
    {
        console.log("Error in sending mail", error);
        res.send("Some error occured");
    }
})

module.exports = sendMailRoute