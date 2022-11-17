const express = require('express')
const router = express.Router()

const SQLHelper = require('../helpers/sqlHelper.js')
const { reset } = require('nodemon')

const path = require('path')

const mariadb = new SQLHelper({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "coderhouse"
    }
}, "productos")

router.get('/', async (req, res) => {
    if (!req.session.login) {
        res.render('login');
    } else {
        let products = await mariadb.getAll();
        let name = req.session.name
        let data = {
            login: req.session.login,
            products: products
        }
        let io = req.app.get('socketio');
        io.on('connection', async (socket) => {            
            socket.emit("currentData", name)
            socket.emit("currentProducts", products)
        })
        res.sendFile(path.join(__dirname, '..', '..', '24-Login/views/home.html'))
        console.log(__dirname)
    }
});

router.post('/', async (req, res) => {
    const io = req.app.get('socketio');
    let newProduct = req.body;
    await mariadb.insert(newProduct);
    const allProducts = await mariadb.getAll();
    io.sockets.emit('currentProducts', allProducts);
    res.send('Se guardo el producto');
})

router.post('/login', async (req, res) => {
    req.session.login = true;
    req.session.name = req.body.username;
    res.redirect('/');
});

router.get('/logout', async (req, res) => {
    if (req.session.login) {
        let name = req.session.name;
        req.session.destroy();
        res.render('logout', {data: name})
    } else {
        res.redirect('/');
    }
});

module.exports = router;