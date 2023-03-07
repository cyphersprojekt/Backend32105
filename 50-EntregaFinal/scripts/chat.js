const socket = io()
socket.connect()

async function fetchAndRender(data) {
    const response = await fetch("./chat_messages.hbs")
    const template = await response.text()
    const dataCompile = Handlebars.compile(template)
    const result = dataCompile(data)
    return result
}

socket.on('currentMessages', async(data) => {
    const messagesList = document.getElementById('list-messages')
    const newContent = await fetchAndRender(data)
    messagesList.innerHTML = newContent
})

async function sendMessage() {
    let messageSender = document.getElementById('messageSender').innerHTML
    let messageVal = document.getElementById('messageVal').value
    let newMessage = {
        sender: messageSender,
        value: messageVal
    }
    socket.emit('newMessage', newMessage)
    document.getElementById('messageVal').value = ''
}