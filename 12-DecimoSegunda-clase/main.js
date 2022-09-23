const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const moment = require('moment/moment')

const Contenedor = require('./helpers/contenedor.js')
const container = new Contenedor('./data/productos.txt')
const mensajero = new Contenedor('./data/mensajes.txt')

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
app.set('views')