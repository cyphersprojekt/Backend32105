const express = require('express')
const router = express.Router()
const MongoHelper = require('../helpers/mongooseHelper')
const Schema = require('mongoose').Schema
const mongoose = require('mongoose');


const isAuth = require('./home').isAuth

const logger = require('../app/logger');

const pSchema = require('./home').productSchema
const cSchema = require('./carrito').cSchema
const vaciarCarrito = require('./carrito').vaciarCarrito

const bSchema = new Schema({
    username: {type: 'string', required: true},
    dateBought: {type: 'date', required: true},
    itemsBought: {type: 'array', required: true}
})

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
        await compras.insert(nuevaCompra)
        logger.info(`${reqUser} compro un carrito con ${carritoQuery.items.length} productos`)
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