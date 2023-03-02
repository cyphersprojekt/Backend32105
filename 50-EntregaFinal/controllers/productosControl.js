const ObjectInterface = require('../db/mongooseObjIface')
const logger = require('./logControl').logger;
const productsHelper = ObjectInterface.getProductosHelper()
const productsModel = ObjectInterface.getProductosModel()
const renderErrorPage = require('./homeControl').renderErrorPage

async function renderDetailedProduct(req, res) {
    let reqProductId = req.params.id
    let product = await productsHelper.getByID(reqProductId)
    if (product.count <= 0) {
        logger.info(`se intento acceder al producto ${reqProductId} pero no existe`)
        renderErrorPage(req, res, 'El producto que buscaste no existe')
    } else {
        res.render('detailedProduct', {product: product})
    }
}