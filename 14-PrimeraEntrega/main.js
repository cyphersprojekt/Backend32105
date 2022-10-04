const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const moment = require('moment/moment')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const Contenedor = require('./helpers/contenedor.js')
const container = new Contenedor(__dirname + '/data/productos.txt')
const messenger = new Contenedor(__dirname + '/data/mensajes.txt')

const apiProductos = require('./routes/apiProductos.js')
const apiCarrito = require('./routes/apiCarrito.js')

const mainRouter = require('./routes/mainRouter.js')
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
app.use(cookieParser())
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))
app.use(mainRouter)
app.use('/api', apiProductos)
app.use('/carrito', apiCarrito)

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