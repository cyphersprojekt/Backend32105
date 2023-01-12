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
    await Carritos.findOneAndUpdate({username: reqUser}, {"$push":{items:productId}}, {new:true})
    logger.info(`se agrego el producto ${productId} al carrito de ${reqUser}`)
    if (redirect) res.redirect(redirect)
}


router.get('/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    agregarProductoACarrito(req, res, idprod, '/')
})


// mi carrito tiene almacenados unicamente los id de los productos que va a comprar el usuario.
// si hicieras esto con sql seria hermoso, una fk, un pequeño join por aquí, un pequeño join por acá, ahí tenes toda tu info.
// como estamos mal de la cabeza, usamos mongo, que no tiene ninguna de esas funcionalidades, motivo por el cual me veo en la
// obligacion de buscar otra vez uno por uno el resto de los datos de cada uno de los productos, y no se me podria ocurrir algo
// menos performante que eso.

async function loopOverProducts(user, carrito) {
    let data = {
        'username': user,
        'items': []
    }
    carrito.items.forEach(async item => {
        logger.info(`estoy iterando sobre el item ${item}`)
        let query = Productos.findOne({_id: item})
        let completeProduct = await query.exec()
        data.items.push(completeProduct)
        logger.info(`agregue el producto ${completeProduct}`)
    })
    return data
}

router.get('/', isAuth, async(req, res)=>{
    let reqUser = req.user.username
    let carritoUser = await Carritos.findOne({username: reqUser})
    let data = await loopOverProducts(reqUser, carritoUser)
    return res.send(data)
})


exports.router = router;
exports.cSchema = cSchema;
exports.crearCarritoVacio = crearCarritoVacio;