const express = require('express')
const router = express.Router()
const process = require('process')

const SQLHelper = require('../helpers/sqlHelper.js')
const { reset } = require('nodemon')

const passport = require('passport')
const mongoHelper = require('../helpers/mongooseHelper');
const Schema = require('mongoose').Schema
const path = require('path')

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
})

const productsHelper = new mongoHelper("products", productSchema)

// const mariadb = new SQLHelper({
//     client: "mysql",
//     connection: {
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "coderhouse"
//     }
// }, "productos")

function isAuth(req, res, next) {
    console.log('isauth en funcionamiento')
    if (req.isAuthenticated()) {
        console.log('todo piola maestro')
        req.session.save()
        next();
    } else {
        console.log('ni a gancho')
        res.redirect('/accounts/login');
    }
}

router.get('/', isAuth, async (req, res)=>{
    const io = req.app.get('socketio')
    let products
    try{
        products = await productsHelper.getAll()
    }
    catch (err){
        console.log(err)
    }
    let name = req.user.username
    res.sendFile(path.join(__dirname, '..', '..', '26-Auth/views/home.html'))
    try {
        io.on('connection', async (socket) => {         
            socket.emit("currentData", name)
            socket.emit("currentProducts", products)
        })
    }
    catch (err) {
        console.log("Failed to connect socket" + err)
    }
})

router.post('/', isAuth, async (req, res)=>{
    console.log('POSTEANDO EN ROOT')
    const product = {name: req.body.name,
                    price: req.body.price,
                    thumbnail: req.body.thumbnail}
    console.log(product)
    await productsHelper.insert(product)
    const io = req.app.get('socketio')
    const allProducts = await productsHelper.getAll()
    io.sockets.emit("currentProducts", allProducts)
    res.send(`Se guardo el objeto.`)
})

router.get('/error', async (req, res) => {
    if (!req.headers.referer) {
    res.render('error', {data: 'Hubo un error con tu solicitud'})
    } else {
        if (req.headers.referer.endsWith('login')) {
            res.render('error', {data: 'Hubo un error al iniciar sesion'})
        }
        if (req.headers.referer.endsWith('register')) {
            res.render('error', {data: 'No se pudo registrar tu cuenta'})
        }
    }
})

router.get('/info', async (req, res) => {
    data = {
        'arguments': process.argv,
        'platform': process.platform,
        'node-version': process.version,
        'memory': process.memoryUsage.rss(),
        'execpath': process.execPath,
        'pid': process.pid,
        'folder': process.execPath
    }

    res.render('info', {data: data})
})

module.exports = router;