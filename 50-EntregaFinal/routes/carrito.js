const express = require('express')
const router = express.Router()

const isAuth = require('../controllers/authControl').isAuth
const isAdmin = require('../controllers/authControl').isAdmin
const vaciarCarrito = require('../controllers/carritosControl').vaciarCarrito
const borrarProductoDeCarrito = require('../controllers/carritosControl').borrarProductoDeCarrito
const agregarProductoACarrito = require('../controllers/carritosControl').agregarProductoACarrito
const Carritos = require('../db/models/carritosModel').carritosModel


router.get('/micarrito/vaciar', isAuth, async (req, res) => {
    vaciarCarrito(req, res, '/', false)
})

router.get('/del/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    borrarProductoDeCarrito(req, res, idprod, '/carritos/micarrito')
})

router.get('/add/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    agregarProductoACarrito(req, res, idprod, '/')
})

router.get('/micarrito', isAuth, async(req, res)=>{
    let reqUser = req.user
    let username = reqUser.username
    let userIsAdmin = isAdmin(reqUser)
    let productosEnCarrito = await Carritos.findOne({username: reqUser.username}).lean()
    let data = {reqUser, username, userIsAdmin, productosEnCarrito}
    res.render('carrito', {data: data})
})


exports.router = router;