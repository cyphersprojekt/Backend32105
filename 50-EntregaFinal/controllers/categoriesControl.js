const ObjectInterface = require('../db/mongooseObjIface')
const logger = require('./logControl').logger;
const categoriesModel = ObjectInterface.getCategoriasModel()
const categoriesHelper = ObjectInterface.getCategoriasHelper()
const renderErrorPage = require('./homeControl').renderErrorPage
const isAdmin = require('./authControl').isAdmin