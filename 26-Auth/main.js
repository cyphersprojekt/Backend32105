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


const dotenv = require('dotenv')
dotenv.config()

const homeRouter = require('./routes/home.js')
const accountsRouter = require('./routes/accounts.js')

const handlebars = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const bodyParser = require('body-parser')

app.use(cookieParser())
console.log(`\r\n\r\n${dotenv.mongoUrl}\r\n\r\n`)
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
    partialsDir: __dirname + '/views/partials'
}))

app.set("view engine", "hbs")

app.set("views", __dirname + "/views")
console.dir(__dirname + '/views')

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

app.use(express.static('26-Auth/scripts'))
app.use(homeRouter)
app.use('/accounts', accountsRouter)

// Handleo todo lo no implementado aca
app.all("*", (req, res) => {
    res.status(404)
    res.end(JSON.stringify({
        error: -2,
        descripcion: `ruta ${req.method} ${req.originalUrl} no implementada`
    }))
});

 
// Comente todo lo de websockets que no creo estar usando
/* Envio la lista inicial de productos y mensajes a quien se conecte, el resto, se encarga el router (productosRouter con su evento newProduct) y el evento newMessage */
// io.on('connection', async (socket) => {

//     let products
//     try{
//         products = await mariadb.getAll()
//     }
//     catch (err){
//         console.log(err)
//     }

//     let msgs
//     try{
//         msgs = await msgsHelper.getAll()
//     }
//     catch (err){
//         console.log(err)
//     }
//     // console.log(msgs)
//     data = {
//         id: 1,
//         msgs: msgs
//     }

//     const authorSchema = new normalizr.schema.Entity("authors")
//     const msgSchema = new normalizr.schema.Entity("msgs") 
//     const dataSchema = new normalizr.schema.Entity("data", {
//         author: authorSchema,
//         msgs: [msgSchema]
//     })

//     const normalized = normalizr.normalize(data, dataSchema)

//     socket.emit("currentProducts", products)
//     socket.emit("currentMessages", normalized)

    /* Guardo un nuevo mensaje y actualizo a todos los usuarios */
//     socket.on("newMessage", async msg =>{
//         msg.date = "[" + moment().format('MMMM Do YYYY, h:mm:ss a') + "]"

//         try{
//             await msgsHelper.insert(msg)
//         }
//         catch (err) {
//             console.log(err)
//         }

//         let msgs
//         try{
//             msgs = await msgsHelper.getAll()
//         }
//         catch (err){
//             console.log(err)
//         }
        
//         io.sockets.emit("currentMessages", msgs)
//     })
// })

httpServer.listen(8080, ()=>{
    console.log("App started and listening on port 8080 :)")
})
