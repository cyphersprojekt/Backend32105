const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const moment = require('moment/moment')
const mongoose = require('mongoose')
const normalizr = require('normalizr')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const process = require('process')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression');
const { createLogger, format, transports } = require("winston");

const homeRouter = require('../routes/home.js')
const accountsRouter = require('../routes/accounts.js')
const numsRouter = require('../routes/numeros.js')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    };

const log2c = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
    transports: [new transports.Console()],
});

const log2f = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
    transports: [new transports.File({
        filename: '../logs/sarasa.log'
    })]
})

app.use(compression());

app.use(cookieParser())
let mongoCreds = {
    mongoUrl: process.env.mongoUrl,
    autoRemove: 'native',
    ttl: 600,
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

app.use(session({
    store: MongoStore.create(mongoCreds),
    secret: 'tarara',
    resave: true,
    saveUninitialized: false}))

app.use(session({
    secret: 'tarara',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.engine("hbs",
 handlebars.engine({
    extname: ".hbs",
    partialsDir: path.join(__dirname, '..', '/views/partials')
}))

app.set("view engine", "hbs")

app.set("views", path.join(__dirname, '..',"/views"))

/* Necesito esto para poder usar sockers en mi Router */
app.set('socketio', io)

//Log time and request
app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString(), req.method, req.originalUrl)
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname,'..', 'scripts')))
app.use(homeRouter)
app.use('/accounts', accountsRouter)
app.use('/api/random', numsRouter)

// Handleo todo lo no implementado aca
app.all("*", (req, res) => {    
    res.status(404)
    res.redirect('/error')
});

exports.app = app
exports.httpServer = httpServer
exports.log2c = log2c
exports.log2f = log2f