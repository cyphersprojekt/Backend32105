const express = require('express')
const router = express.Router()

const SQLHelper = require('24-Login/helpers/sqlHelper.js')
const { reset } = require('nodemon')

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
        let data = {
            login: req.session.login,
            name: req.session.name,
            products: products
        }
        res.render("home", {
            data: data
        });
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
        res.session.destroy();
        res.render('logout', {data: name})
    } else {
        res.redirect('/');
    }
});

module.exports = router;