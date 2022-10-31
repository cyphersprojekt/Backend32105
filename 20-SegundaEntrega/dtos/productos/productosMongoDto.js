const mongooseHelper = require('../../helpers/mongoose-helper.js')
const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    code: {type: Number, required: true},
    stock: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    date: {type: Date, required: true, default: new Date()}
})

class productosMongoDto extends mongooseHelper{
    constructor(){
        super('producto', productoSchema)
    }
}

module.exports = productosMongoDto