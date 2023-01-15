const express = require('express')
const router = express.Router()
const MongoHelper = require('../helpers/mongooseHelper')
const Schema = require('mongoose').Schema
const mongoose = require('mongoose');


const isAuth = require('./home').isAuth

const logger = require('../app/logger');

const pSchema = require('./home').productSchema
const cSchema = require('./carrito').cSchema

const bSchema = new Schema({
    username: {type: 'string', required: true},
    dateBought: {type: 'date', required: true},
    itemsBought: {type: 'array', required: true},
    paidMedia: {type: 'string', required: true}
})

let Carritos = mongoose.model('carritos', cSchema)
let Productos = mongoose.model('products', pSchema)
let Compras = mongoose.model('compras', bSchema)

