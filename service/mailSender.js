const nodemailer = require('nodemailer');
const transporter = require('../configs/mailer');

async function sendMail ({emailTo, emailFrom, link, filename, size})
{
    await transporter.sendMail({
        from : emailFrom,
        to : emailTo,
        subject : "Look what i found for you",
        html : `<div style="color:red;font-weight:bolder;">I love you mota hathi babu</div>`
    })
}

module.exports = sendMail