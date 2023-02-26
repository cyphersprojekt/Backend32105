const twilio = require('twilio')
const logger = require('../controllers/logControl').logger;
const config = require('../app/config')


const accountSid = config.TWILIO_SID
const authToken = config.TWILIO_AUTH_TOKEN

const client = new twilio(accountSid, authToken)

async function sendTwilioMessage(body, to) {
    try {
    client.messages.create({
        body: body,
        to: to,
        from: config.TWILIO_NUMBER
    }).then((msg) => logger.info(`sent sms ${msg.sid}`))
    } catch(e) {
        logger.error('No se pudo enviar el SMS!!!!')
    }}
async function sendWhatsappMessage(body, to) {
    try {
    client.messages.create({
        body: body,
        to: `whatsapp:${to}`,
        from: `whatsapp:${config.TWILIO_WHATSAPP_NUMBER}`
    }).then(wpp => logger.info(`sent whatsapp msg ${wpp.sid}`))
    } catch(e){
        logger.error('No se pudo enviar el WhatsApp!!!')
    } }



exports.sendTwilioMessage = sendTwilioMessage
exports.sendWhatsappMessage = sendWhatsappMessage