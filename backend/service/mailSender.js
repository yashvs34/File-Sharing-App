const nodemailer = require('nodemailer');
const transporter = require('../configs/mailer');

async function sendMail ({emailTo, emailFrom, link, fileName, size})
{
    await transporter.sendMail({
        from : emailFrom,
        to : emailTo,
        subject : `New File Shared`,
        html : `You have been invited by ${emailFrom} to view ${fileName} :- ${link}`
    })
}

module.exports = sendMail