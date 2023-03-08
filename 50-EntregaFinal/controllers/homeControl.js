const ObjectInterface = require('../db/mongooseObjIface')
const ProductDto = require('../db/dtos/productosDto');
const { productosModel } = require('../db/models/productosModel');
const categoriesHelper = require('../db/models/categoriesModel').categoriesHelper;
const logger = require('./logControl').logger;
const productsHelper = ObjectInterface.getProductosHelper()
const isAdmin = require('./authControl').isAdmin
const cpus = require('os').cpus().length;


// esto queda aca simplemente xq muestro la lista de todos mis productos
// en el home, pero lo correcto seria probablemente moverlo al controlador de productos 
async function renderHomePage(req, res) {
    const io = req.app.get('socketio')
    let products
    try{
        products = await productsHelper.getAll()
    }
    catch (err){
        logger.error(err)
    }
    let name = req.user.username
    let userIsAdmin = isAdmin(req.user)
    let allCategories = await categoriesHelper.getAll()
    let data = {name, userIsAdmin, allCategories}
    res.render('home', {data: data})
    try {
        io.on('connection', async (socket) => {         
            socket.emit("currentData", name)
            socket.emit("currentProducts", products)
        })
    }
    catch (err) {
        logger.error("Failed to connect socket" + err)
    }
}

async function createNewProduct(req, res) {
    try {
    let product = new ProductDto(
                    req.body.name,
                    req.body.price,
                    req.body.thumbnail,
                    req.body.category
                )
    await productsHelper.insert(product)
    const io = req.app.get('socketio')
    const allProducts = await productsHelper.getAll()
    io.sockets.emit("currentProducts", allProducts)
    res.send(`Se guardo el objeto.`) }
    catch {
        logger.error('fallo la validacion de producto')
        res.send('error')
    }
}

async function renderErrorPage(req, res, message=null){
    // esto es feisimo pero quedo asi de como estaba antes,
    // no quiero sacarlo para no tener que meterme con los routers
    // de accounts pero agrego el message para que usos futuros
    // puedan tener un mensaje custom
    if (req.headers.referer) {
        if (req.headers.referer.endsWith('login')) {
            res.render('error', {data: 'Hubo un error al iniciar sesion'})
        }
        if (req.headers.referer.endsWith('register')) {
            res.render('error', {data: 'No se pudo registrar tu cuenta'})
        }
    }
    else if (message) {
        res.render('error', {data: message})
    }
    else {
        res.render('error', {data: 'Hubo un error con tu solicitud'})
    }

}

async function renderSuccessPage(req, res, message=null) {
    if (message) {
        res.render('success', {data: message})
    } else {
        res.render('success', {data: 'Alles gute!'})
    }
}

async function renderDetailedProduct(req, res) {
    try {
        let reqUser = req.user;
        let name = reqUser.name;
        let userIsAdmin = isAdmin(reqUser)
        let requestedProductId = req.params.productId
        // uno esperaria que si vos buscas un id que no existe, el resultado simplemente
        // sea nulo. por desgracia, estas cayendo en la trampa conocida como
        // 'pensar como un ser humano racional' dado que nuestro querido mongo, si el id
        // que vos le pasas esta mal o no cumple con los 487923 caracteres hexadecimales,
        // te levanta una excepcion que rompe todo. podria agregar un chequeo de longitud
        // en mi metodo getById? si. seria mejor en terminos de funcionamiento que hacer
        // esto? no.
        let detailedProduct
        try {
            detailedProduct = await productsHelper.getByID(requestedProductId)
        } catch {
            detailedProduct = []
        }
        let data = {name, userIsAdmin, requestedProductId, detailedProduct}
        if (detailedProduct && detailedProduct != []) {
            res.render('detailedProduct', {data: data})
        } else {
            res.render('error', {data: 'no se encontro el producto'})
        }
    } catch {
        renderErrorPage(req, res, 'oops! Hubo un error al buscar tu producto')
    }
}

async function renderInfoPage(req, res) {
    let userIsAdmin = isAdmin(req.user)
    data = {
        'userIsAdmin': userIsAdmin,
        'arguments': process.argv,
        'platform': process.platform,
        'node-version': process.version,
        'memory': process.memoryUsage.rss(),
        'execpath': process.execPath,
        'pid': process.pid,
        'folder': process.execPath,
        'cpus': cpus
    }
    res.render('info', {data: data})
}

exports.renderHomePage = renderHomePage
exports.createNewProduct = createNewProduct
exports.renderErrorPage = renderErrorPage
exports.renderSuccessPage = renderSuccessPage
exports.renderDetailedProduct = renderDetailedProduct
exports.renderInfoPage = renderInfoPage