const express = require('express')
const router = express.Router()
const isAuth = require('../controllers/authControl').isAuth
const renderCategoriasPage = require('../controllers/categoriesControl').renderCategoriasPage
const renderFiltroByCategoria = require('../controllers/categoriesControl').renderFiltroByCategoria
const crearCategoria = require('../controllers/categoriesControl').crearCategoria
const borrarCategoria = require('../controllers/categoriesControl').borrarCategoria

router.get('/', isAuth, async(req, res)=> {
    renderCategoriasPage(req, res)
})

router.post('/', isAuth, async(req, res)=> {
    crearCategoria(req, res)
})

router.post('/:deleteCategory', isAuth, async(req, res)=> {
    borrarCategoria(req, res)
})

router.get('/:searchCategory', async(req, res) => {
    renderFiltroByCategoria(req, res)
})

exports.router = router