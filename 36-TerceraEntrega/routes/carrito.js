const express = require('express')
const router = express.Router()
const MongoHelper = require('../helpers/mongooseHelper')
const Schema = require('mongoose').Schema
const mongoose = require('mongoose');


const isAuth = require('./home').isAuth

const logger = require('../app/logger');

const cSchema = new Schema({ 
    username: {type: String, required: true},
    items: {type: Array, required: true}
 })

let carritos = new MongoHelper('carritos', cSchema)
let Carritos = mongoose.model('carritos', cSchema)

const pSchema = require('./home').pSchema
let Productos = mongoose.model('products', pSchema)

async function crearCarritoVacio(req, res, redirect) {
    let reqUser = req.user.username
    let query = Carritos.findOne({username: reqUser})
    if (query.count() > 0) {
        logger.error('falla de logica, se intento generar un carrito para un usuario que ya tiene uno')
        logger.error('Corresponde hacer un update o eliminarlo y crear uno nuevo')
        if (redirect) { res.redirect(redirect) }
    } else {
        let newCarrito = {
            'username': reqUser,
            'items': []
        }
        try {
        carritos.insert(newCarrito)
        logger.info(`se creo un carrito vacio para ${reqUser}`)
        res.redirect('/')
        } catch(e) {
            logger.error(e)
        }
    }
}

async function agregarProductoACarrito(req, res, productId, redirect) {
    let reqUser = req.user.username
    let query = Carritos.findOne({username: reqUser})
    if (query.count() < 0) {
        logger.error('se intento agregar un producto a un carrito que no existe')
        crearCarritoVacio(req, res, false)
    }
    let product = await Productos.findOne({_id: productId})
    await Carritos.findOneAndUpdate({username: reqUser}, {"$push":{items:product}})
    logger.info(`se agrego el producto ${productId} al carrito de ${reqUser}`)
    if (redirect) res.redirect(redirect)
}


router.get('/add/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    agregarProductoACarrito(req, res, idprod, '/')
})

router.get('/micarrito', isAuth, async(req, res)=>{
    let reqUser = req.user.username
    let data = await Carritos.findOne({username: reqUser}).lean()
    console.log(data)
    res.render('carrito', {data: data, username: reqUser})
})


exports.router = router;
exports.cSchema = cSchema;
exports.crearCarritoVacio = crearCarritoVacio;