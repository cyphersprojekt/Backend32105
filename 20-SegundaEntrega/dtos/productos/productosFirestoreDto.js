const firestoreHelper = require('../../helpers/firestore-helper.js')

class carritoFirestore extends firestoreHelper {
    constructor(collection) {
        super("producto")
    }
}

module.exports = carritoFirestore