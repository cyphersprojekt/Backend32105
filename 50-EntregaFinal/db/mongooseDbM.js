const mongoose = require('mongoose');
const config = require('../app/config')

mongoose.connect(config.MONGO_URL)
class mongooseHelper{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async getByID(id){
        const data = await this.collection.findOne({_id: id}).lean()
        return data
    }

    async getAll(){
        const data = await this.collection.find({})
        return data
    }

    async insert(obj) {
        const model = new this.collection(obj);
        await model.save();
        return model._id;
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