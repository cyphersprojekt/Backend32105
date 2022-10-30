const mongooseHelper = require('../../helpers/mongoose-helper.js')
const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    precio: {type: Number, require: true},
    codigo: {type: Number, require: true},
    stock: {type: Number, require: true},
    thumbnail: {type: String, require: true},
    fecha: {type: Date, require: true, default: new Date()}
})

class productosMongoDto extends mongooseHelper{
    constructor(){
        super('productos', productoSchema)
    }
}

module.exports = productosMongoDto