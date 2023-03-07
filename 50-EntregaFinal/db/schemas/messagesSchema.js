const Schema = require('mongoose').Schema

const messageSchema = new Schema ({
    sender: {type: String, required: true},
    value: {type: String, required: true}
})

exports.messageSchema = messageSchema