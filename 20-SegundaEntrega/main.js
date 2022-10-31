const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const dotenv = require('dotenv')
dotenv.config()

const productosMongoDto = require("./dtos/productos/productosMongoDto")
const productosFireDto = require("./dtos/productos/productosFirestoreDto")

const carritosMongoDto = require("./dtos/carrito/carritoMongoDto")
const carritosFireDto = require("./dtos/carrito/carritoFirestoreDto")

const productosRouter = require('./routes/productos.js')
const carritoRouter = require('./routes/carrito.js')

const app = express()
const httpServer = new HttpServer(app)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString(), req.method, req.originalUrl)
    next()
})


app.use("/api/productos", productosRouter)
app.use("/api/carrito", carritoRouter)

switch (process.env.dbType){
    case "mongo":
        productos = new productosMongoDto();
        carrito = new carritosMongoDto();
        break
    case "firestore":
        productos = new productosFireDto();
        carrito = new carritosFireDto();
        break
}
console.log(process.env.dbType)

app.set('productosDb', productos)
app.set('carritoDb', carrito)


app.all("*", (req, res) => {
    res.status(404)
    res.end(JSON.stringify({
        error: -2,
        descripcion: `ruta ${req.method} ${req.originalUrl} no implementada`
    }))
});

httpServer.listen(8080, ()=>{
    console.log("App started and listening on port 8080")
})




