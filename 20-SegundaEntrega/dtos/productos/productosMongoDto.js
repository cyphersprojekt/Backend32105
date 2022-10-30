const mongooseHelper = require('../../helpers/mongoose-helper.js')
const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    code: {type: Number, require: true},
    stock: {type: Number, require: true},
    thumbnail: {type: String, require: true},
    date: {type: Date, require: true, default: new Date()}
})

class productosMongoDto extends mongooseHelper{
    constructor(){
        super('productos', productoSchema)
    }
}

module.exports = productosMongoDto