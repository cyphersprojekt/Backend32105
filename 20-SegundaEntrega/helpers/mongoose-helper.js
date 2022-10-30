const mongoose = require('mongoose')

async function connect() {
    mongoose.connect("mongodb://localhost:27017")
}

connect()
class mongooseHelper{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async getByID(id){
        const data = await this.collection.find(id)
        return data
    }

    async getAll(){
        const data = await this.collection.find({})
        return data
    }
}

module.exports = mongooseHelper