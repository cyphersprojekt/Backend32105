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

    async insert(obj) {
        const model = new this.collection(obj);
        await model.save();
    }

    async update(obj, id) {
        obj.date = new Date();
        const model = await this.collection.findOne({_id: id})
        model.overwrite(obj)
        model.save();
    }

    async delete(id) {
        await this.collection.deleteOne({_id: id})
    }
}

module.exports = mongooseHelper