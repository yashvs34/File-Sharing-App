const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./configs/mongodbConnections');
const sendMail = require('./service/mailSender');
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to File-Sharing-App");
})

let emailOptions = {
    emailFrom : "yashvardhansingh232@gmail.com",
    emailTo : "vidhi.singh.parihar.2711@gmail.com",
    link : "abcd",
    fileName : "abdc",
    size : 1234
}

app.get('/send', async (req, res) => {
    try
    {
        for (let i = 0 ; i < 500 ; i++)
        {
            await sendMail(emailOptions);
        }
        res.send("Email sent successfully");
    }
    catch (error)
    {
        console.log("Error in sending mail", error);
        res.send("Some error occured");
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})