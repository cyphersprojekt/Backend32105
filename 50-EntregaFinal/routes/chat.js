const express = require('express')
const router = express.Router()
const isAuth = require('../controllers/authControl').isAuth
const renderChatPage = require('../controllers/messagesControl').renderChatPage
const renderMessagesBySender = require('../controllers/messagesControl').renderMessagesBySender

router.get('/', isAuth, async (req, res) => {
    renderChatPage(req, res)
})

router.get('/:senderEmail', isAuth, async(req, res) => {
    renderMessagesBySender(req, res)
})

exports.router = router