const ObjectInterface = require('../db/mongooseObjIface')
const messagesModel = ObjectInterface.getMessagesModel()
const messagesHelper = ObjectInterface.getMessagesHelper()
const isAdmin = require('./authControl').isAdmin
const logger = require('./logControl').logger

async function renderChatPage(req, res) {
    const io = req.app.get('socketio')
    let allMessages = await messagesHelper.getAll()
    let userIsAdmin = isAdmin(req.user)
    let name = req.user.username
    let email = req.user.email
    let data = {name, email, userIsAdmin}
    res.render('chat', {data: data})
    try {
        io.on('connection', async (socket) => {
            socket.emit('currentMessages', allMessages)

            socket.on('newMessage', async(messageObj) =>{
                console.log('se recibio newMessage')
                console.log(messageObj)
                createNewMessage(messageObj)
                let allMessages = await messagesHelper.getAll()
                io.sockets.emit('currentMessages', allMessages)
            })
        })
        
    } catch (e) {
        logger.error('Failed to connect socket ' + e)
    }
}

async function createNewMessage(messageObj) {
    await messagesHelper.insert(messageObj)
}

async function filterMessagesBySender(req, res) {
    return true
}

exports.renderChatPage = renderChatPage
exports.createNewMessage = createNewMessage