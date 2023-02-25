const Schema = require('mongoose').Schema

const categoriesSchema = new Schema({
    name: {type: String, required: true}
})

exports.categoriesSchema = categoriesSchema