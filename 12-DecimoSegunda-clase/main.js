const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const moment = require('moment/moment')

const Contenedor = require('./helpers/contenedor.js')
const container = new Contenedor('12-DecimoSegunda-clase/data/productos.txt')
const messenger = new Contenedor('12-DecimoSegunda-clase/data/mensajes.txt')

const productosRouter = require('./routes/productos.js')
const handlebars = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const bodyParser = require('body-parser');
const { append } = require('vary');

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.set('socketio', io)

app.use((req,res,next) => {
    console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString(), req.method, req.originalUrl)
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('12-DecimoSegunda-clase/public'))
app.use(productosRouter)

io.on('connection', (socket) => {
    let products = container.getAllData()
    let mensajes = messenger.getAllData()
    socket.emit('currentProducts', products)
    socket.emit('currentMessages', mensajes)

    socket.on('newMessage', mensaje => {
        mensaje.fecha = `[ ${moment().format('MMMM Do YYYY, h:mm')} ]`
        messenger.save(mensaje)
        let mensajes = messenger.getAllData()
        io.sockets.emit('currentMessages', mensajes)
    })
})

httpServer.listen(8080, () => { console.log('listening on port 8080') })