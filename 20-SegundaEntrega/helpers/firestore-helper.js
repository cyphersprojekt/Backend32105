const firebaseAdmin = require('firebase-admin')
const firebase = require('./firestore-config')


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebase)
})

const firedb = firebaseAdmin.firestore()


class firestoreHelper {
    constructor(collection){
        this.collection = firedb.collection(collection)
    }

    async getByID(id){
        const doc = this.collection.doc(id)
        const data = await doc.get()
        const response = data.data()
        return response
    }

    async getAll(){
        const data =  await this.collection.get()
        const response = data.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            code:  doc.data().code,
            stock: doc.data().stock,
            thumbnail: doc.data().thumbnail,
            date: doc.data().date,
        }))  
        return response
    }

    async insert(obj){
        obj.date = new Date()
        const doc = this.collection.doc()
        obj._id = doc.id
        await doc.create(obj)
    }

    async update(obj, id){
        obj.date = new Date()
        const doc = this.collection.doc(id)
        await doc.update(obj)
    }

    async delete(id){
        const doc = this.collection.doc(id)
        await doc.delete()
    }
}

module.exports = firestoreHelper