const ProductosModel = require('../db/mongooseObjIface.js').getProductosModel();
const ProductosHelper = require('../db/mongooseObjIface.js').getProductosHelper();
const ProductosDto = require('../db/dtos/productosDto');

async function getAllProducts() {
    return await ProductosHelper.getAll()
}

async function getProductById(id) {
    return await ProductosHelper.getByID(id)
}

async function createNewProduct(product) {
    let newProduct = new ProductosDto(
        product.name,
        product.price,
        product.thumbnail
    )
    return await ProductosHelper.insert(newProduct)
}

async function updateProduct(id, product) {
    let newProduct = new ProductosDto(
        product.name,
        product.price,
        product.thumbnail
    )
    return await ProductosHelper.overwrite(id, newProduct)
}

async function deleteProduct(id) {
    return await ProductosHelper.delete(id)
}

module.exports = { getAllProducts, getProductById, createNewProduct, updateProduct, deleteProduct}