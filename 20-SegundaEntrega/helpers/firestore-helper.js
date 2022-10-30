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
        const data =  await this.collection.doc(id).get()
        return data
    }

    async getAll(){
        const data =  await this.collection.doc().get()
        return data
    }
}

module.exports = firestoreHelper