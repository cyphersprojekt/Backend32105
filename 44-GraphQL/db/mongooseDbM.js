const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.mongoUrl);

class mongooseHelper{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async getByID(id){
        const data = await this.collection.findById(id).lean()
        return data
    }

    // no se por que esto estaba comentado pero si funciona
    // me sirve para lo que tengo que hacer ahora asi que 
    // gracias ignacito del pasado

    // async find(field, value) {
    //     const selector = {[field] : value}
    //     const data = await this.collection.findOne(selector)
    //     if (data != null) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

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
        const model = await this.collection.findOne({_id: id}).lean();
        model.overwrite(obj)
        model.save();
    }

    //a esta altura ya no tengo idea que estoy haciendo.
    // en algun momento my update de arriba funcionaba. ya no.
    //esto lo encontre en geeksforgeeks
    async overwrite(id, newObject) {
        const doc = this.collection.findById(id)
        const output = (await doc).overwrite(newObject)
        output.save()
    }
    //update 2: estaba escribiendo 'thumbnai' en lugar de
    // 'thumbnail' en el test. quizas el update funcionaba.
    // esto seguro anduvo. yo lo dejo asi.


    async delete(id) {
        await this.collection.deleteOne({_id: id})
    }
}

module.exports = mongooseHelper