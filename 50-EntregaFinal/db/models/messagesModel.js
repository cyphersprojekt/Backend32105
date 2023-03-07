const Model = require('mongoose').model;
const Helper = require('../mongooseDbM')
const messageSchema = require('../schemas/messagesSchema').messageSchema

const messagesModel = new Model('messages', messageSchema)
const messagesHelper = new Helper('messages', messageSchema)

exports.messagesModel = messagesModel
exports.messagesHelper = messagesHelper