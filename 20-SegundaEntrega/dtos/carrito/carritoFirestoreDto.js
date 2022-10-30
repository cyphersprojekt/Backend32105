const firestoreHelper = require('../../helpers/firestore-helper')

class carritoFirestore extends firestoreHelper {
    constructor(collection) {
        super("carrito")
    }
}

module.exports = carritoFirestore