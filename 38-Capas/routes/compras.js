const express = require('express')
const router = express.Router()
const MongoHelper = require('../helpers/mongooseHelper')
const mongoose = require('mongoose');
const sendMail = require('../helpers/nodemailerHelper').sendMail
const sendTwilioMessage = require('../helpers/twilioHelper').sendTwilioMessage
const sendWhatsappMessage = require('../helpers/twilioHelper').sendWhatsappMessage

const isAuth = require('./home').isAuth

const logger = require('../app/logger');

const pSchema = require('./home').productSchema
const cSchema = require('./carrito').cSchema
const vaciarCarrito = require('./carrito').vaciarCarrito



let Carritos = mongoose.model('carritos', cSchema)
let Productos = mongoose.model('products', pSchema)
let Compras = mongoose.model('compras', bSchema)
let compras = new MongoHelper('compras', bSchema)

async function comprarCarrito(req, res) {
    let reqUser = req.user.username
    let carritoQuery = await Carritos.findOne({username: reqUser}).lean()
    if (carritoQuery.count <= 0) {
        logger.error(`se intento comprar un carrito que no existe`)
    } else if (carritoQuery.items.length == 0) {
        logger.error(`${reqUser} intento comprar un carrito vacio`)
    } else {
        let nuevaCompra = {
            username: reqUser,
            dateBought: new Date(),
            itemsBought: carritoQuery.items
        }
        let boughtString = '';
        carritoQuery.items.forEach(item => {
            boughtString = boughtString + `<li><b>Item:</b> ${item.name}<br> <li><b>Price:</b> ${item.price}<br><br>`
        })
        await compras.insert(nuevaCompra)
        logger.info(`${reqUser} compro un carrito con ${carritoQuery.items.length} productos`)
        sendMail(
            null,
            `Nuevo pedido de compra por parte de ${reqUser}, ${req.user.email}`,
            boughtString,
            `${boughtString}`
        )
        sendTwilioMessage(
            `Orden de compra confirmada ${boughtString}`, req.user.phone_number
        )
        sendWhatsappMessage(
            `Orden de compra confirmada para ${reqUser} con ${boughtString}`, process.env.ADMIN_PHONE_NUMBER
        )
        vaciarCarrito(req, res, '/', true)
    }
}

// esto va a haber que pasarlo a POST una vez que empecemos a manejar info de pago
router.get('/nuevacompra', isAuth, async (req, res) => {
    comprarCarrito(req, res)
})

router.get('/', isAuth, async (req, res) => {
    let reqUser = req.user.username
    let data = await Compras.find({username: reqUser}).sort({dateBought: -1}).lean()
    res.render('compras', {data: data, username: reqUser})
 })

exports.router = router;