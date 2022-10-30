const mongoose = require('mongoose')

async function connect() {
    mongoose.connect("mongodb://localhost:27017/ecommerce")
}

connect()
class mongooseHelper{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async getByID(id){
        const data = await this.collection.find({_id: id})
        return data
    }

    async getAll(){
        const data = await this.collection.find({})
        return data
    }

    async save(obj) {
        const product = await this.collection.create(obj)
        return product
    }

    async update(obj, id) {

    }

    async deleteId(obj, id) {

    }

    async deleteAll() {

    }
}

module.exports = mongooseHelper