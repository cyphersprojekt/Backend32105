const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()
const productosMongoDto = require("../dtos/productos/productosMongoDto")
const productosFireDto = require("../dtos/productos/productosFirestoreDto")

switch (process.env.dbType){
    case "mongo":
        productos = new productosMongoDto();
        break
    case "firestore":
        productos = new productosFireDto();
        break
}

router.get('/', async (req, res)=>{
    let currentData

    try{
        currentData = await productos.getAll()
    }
    catch (err){
        console.log('chupame la pija')
    }
    if(currentData){
        res.send(currentData)
    }
    else{
        res.send({error: 'No hay productos'})
    }
})

router.get('/:id', async (req, res)=>{
    let currentData
    const {id} = req.params
    try {
        currentData = await productos.getByID(id)
    }
    catch (e) {
        console.log(e)
    }
    if (currentData) {
        res.send(currentData)
    }
    else {
        res.send({error: 'Producto no encontrado'})
        }
    }
)


router.post('/', async (req, res)=>{
    const productInsert = req.body
    try {
        await productos.insert(productInsert)
        res.send(`Se guardo el producto`)
    }
    catch(e) {
        console.log(e)
        res.send('caca')
    }
})

router.put('/:id', async (req, res) => {
    const newProduct = req.body
    const id = req.params.id
    let oldProduct
    try {
        oldProduct = await productos.getByID(id)
    }
    catch(e){
        console.log(e)
    }
    if (oldProduct){
        await productos.update(id, newProduct)
        res.send(`Se actualizo el producto con ID ${id}`)
    }
    else {
        res.send('no se encontro el producto para actualizar')
    }
})

router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    let product
    try {
        product = await productos.getByID(id)
    }    
    catch(e) {
        console.log(e)
    }
    if (product){
        await productos.delete(id)
        res.send(`se borro el producto con id ${id}`)
    }
    else {
        res.send(`no se encontro el producto`)
    }
})

module.exports = router

