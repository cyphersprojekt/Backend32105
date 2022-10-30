const express = require('express')
const router = express.Router()
const random = require('random')
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
        console.log(err)
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
    const newProduct = await productos.save(productInsert)
    //console.log(newProduct)
    if (newProduct) {
        res.send(`Se guardo el producto ${newProduct._id}`)
    }
    else {
        res.send(`Error guardando el producto ${productInsert}`)
    } } )


router.put('/:id', (req, res) =>{
    const product = req.body
    const id = parseInt(req.params.id)
    if(contenedor.getbyId(id)){
        contenedor.deleteById(id)
        contenedor.saveWithId(product, id)//
        res.send(`Fue actualizado el producto con ID ${id}`)
    }
    else{
        res.send({error: 'Producto no encontrado'})
    }

})

router.delete('/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    if(contenedor.getbyId(id)){
        contenedor.deleteById(id)
        res.send(`El producto con ID ${id} fue eliminado`)
    }
    else{
        res.send({error: 'Producto no encontrado'})
    }
})









// Post desde index.html
/* router.post('/productos', (req, res) =>{
    const product = {
        title:   req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    contenedor.save(product) */

    /* Me traigo la instancia de IO del main, la lista actualizada de productos y la emito globalmente, luego de cada insercion */
/*     const io = req.app.get('socketio')
    const allProducts = contenedor.getAll()
    io.sockets.emit("currentProducts", allProducts) */

/*     const allProducts = contenedor.getAll()
    const id = allProducts[allProducts.length-1]["id"] */

    
/*     res.end()
}) */


/* router.get('/productoRandom', (req, res)=>{
    let randomNumber = random.int(1, 3)
    let currentData = contenedor.getbyId(randomNumber)
    res.send(currentData)
})
 */

module.exports = router

