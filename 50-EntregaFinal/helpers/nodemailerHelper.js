const nodemailer = require("nodemailer");
const config = require('../app/config')
const logger = require('../controllers/logControl').logger

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: (config.SMTP_SECURE === 'true') ? true : false,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
    }
})

async function sendMail(to, subject, text, html) {
    try {
    let info = await transporter.sendMail({
        from: '"Coderhouse 32105" <worst@ecommerce.ever>',
        to: [to, config.ADMIN_ADDRESS],
        subject: subject,
        text: text,
        html: html
    })
    return info
    } catch(e) {
        logger.error('No se pudo enviar el mail!!!')
    }
}

exports.sendMail = sendMail