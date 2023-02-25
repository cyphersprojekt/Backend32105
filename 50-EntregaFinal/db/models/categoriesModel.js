const Model = require('mongoose').model;
const Helper = require('../mongooseDbM')
const categoriesSchema = require('../schemas/categoriesSchema').categoriesSchema

const categoriesModel = new Model('categories', categoriesSchema)
const categoriesHelper = new Helper('categories', categoriesSchema)

exports.categoriesModel = categoriesModel
exports.categoriesHelper = categoriesHelper