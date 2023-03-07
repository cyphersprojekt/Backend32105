const express = require('express')
const router = express.Router()
const isAuth = require('../controllers/authControl').isAuth
const renderChatPage = require('../controllers/messagesControl').renderChatPage

router.get('/', isAuth, async (req, res) => {
    renderChatPage(req, res)
})

exports.router = router