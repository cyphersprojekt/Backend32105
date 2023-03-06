const Schema = require('mongoose').Schema

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true},
    stock: {type: Number, required: true, default: 1}
})

exports.productSchema = productSchema