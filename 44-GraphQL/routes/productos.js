const express = require('express')
const router = express.Router()
const { getAllProducts, getProductById, 
    createNewProduct, updateProduct, 
    deleteProduct } = require('../controllers/productosControl')

router.get("/", getAllProducts)

router.get("/:idtoSearch", getProductById)

router.post("/", createNewProduct)

router.put("/:idtoUpdate", updateProduct)

router.delete("/:idtoDelete", deleteProduct)

exports.router = router