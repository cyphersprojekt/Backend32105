const ObjectInterface = require('../db/mongooseObjIface')
const productsHelper = ObjectInterface.getProductosHelper();
const ProductDto = require('../db/dtos/productosDto')

async function getAllProducts(req, res) {
    let products = await productsHelper.getAll();
    res.send(products);
}

async function getProductById(req, res) {
    let reqId = req.params.idtoSearch;
    let foundProduct = await productsHelper.getByID(reqId);
    if (!foundProduct) { res.send(404); }
    else {res.send(foundProduct)}
}

async function createNewProduct(req, res) {
    let product = new ProductDto(
        req.body.name,
        req.body.price,
        req.body.thumbnail
    )
    let newProductId = await productsHelper.insert(product)
    res.send(`Se creo el producto ${newProductId}`)
}

async function updateProduct(req, res) {
    let reqId = req.params.idtoUpdate
    if (productsHelper.getByID(reqId) != []) {
    let updatedProduct = new ProductDto(
        req.body.newName,
        req.body.newPrice,
        req.body.newThumbnail
    )
    await productsHelper.update(updatedProduct, reqId)
    res.send(productsHelper.getByID(reqId)) }
    else {
        res.send(`No se encontro el objeto buscado`)
    }
}

async function deleteProduct(req, res) {
    let reqId = req.params.idtoDelete
    if (productsHelper.getByID(reqId) != []) {
        await productsHelper.delete(reqId)
        res.send(`se elimino el producto con id ${reqId}`)
    } else {
        res.send(`no se encontro el producto con el id ${reqId}`)
    }
}

module.exports = {
                getAllProducts,
                getProductById,
                createNewProduct,
                updateProduct,
                deleteProduct
            }