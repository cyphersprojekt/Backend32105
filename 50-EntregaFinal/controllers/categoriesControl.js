const { productosHelper } = require('../db/models/productosModel');
const ObjectInterface = require('../db/mongooseObjIface')
const logger = require('./logControl').logger;
const categoriesModel = ObjectInterface.getCategoriasModel()
const categoriesHelper = ObjectInterface.getCategoriasHelper()
const renderErrorPage = require('./homeControl').renderErrorPage
const renderSuccessPage = require('./homeControl').renderSuccessPage
const isAdmin = require('./authControl').isAdmin


// hay un millon de chequeos de si el usuario es admin o no en cada parte del controlador
// porque si bien yo puedo inhibir a un cliente de acceder a /categorias a traves del navegador
// la verdad es que no tengo idea de como se va a comportar esa misma restriccion cuando en lugar
// de GET hagas un POST a traves de postman o insomnia. mejor prevenir que lamentar
async function renderCategoriasPage(req, res) {
    let reqUser = req.user.username
    let userIsAdmin = isAdmin(req.user)
    if(!isAdmin(req.user)) {
        renderErrorPage(req, res, 'Solo los administradores tienen acceso a esta pagina')
    } else {
        let allCategories = await categoriesHelper.getAll()
        data = {reqUser, allCategories, userIsAdmin}
        res.render('categorias', {data: data})
    }
}

async function renderFiltroByCategoria(req, res) {
    let reqUser = req.user
    let userIsAdmin = isAdmin(reqUser)
    let requestedCategory = req.params.searchCategory;
    let foundProducts = await productosHelper.getByCategory(requestedCategory)
    let data = {reqUser, userIsAdmin, requestedCategory, foundProducts}
    res.render('detailedCategory', {data: data})
}

async function crearCategoria(req, res) {
    let newCategoryName = req.body.name
    let newCategoryObject = {name: newCategoryName}
    let checkExistingQuery = await categoriesModel.find({name: newCategoryName}).lean()
    // por que no me funciona ni el length de un json lean ni el count() de un objeto de mongo?
    // lo tengo asi en los carritos
    if (checkExistingQuery.length >= 1) {
        res.render('error', {data: 'Ya existe una categoria con ese nombre'})
    } else {
        try {
            await categoriesHelper.insert(newCategoryObject)
            renderSuccessPage(req, res, `Se creo la categoria ${newCategoryName}`)
        } catch {
            res.render('error', {data: 'Ups! No pudimos crear la categoria'})
        }
    }
}

async function borrarCategoria(req, res) {
    let reqUser = req.user
    let categoryToDelete = req.body.deleteCategory
    if (!isAdmin(reqUser)) {
        renderErrorPage(req, res, 'Solo los administradores pueden eliminar categorias!')
    } else {
        try {
            let category = await categoriesModel.findOne({name: categoryToDelete}).lean()
            if (category) {
                await categoriesHelper.delete(category._id)
                // si yo fuera un buen programador pensaria alguna forma de que eliminar
                // una categoria te elimine todos los productos dentro de ella pero a esa
                // altura deberias pagarme porque ya le dedique mas tiempo a esta entrega
                // que a proyectos enteros para el trabajo
                renderSuccessPage(req, res, `Se elimino la categoria solicitada. <br>
                No se eliminaran productos!`)
            }
        } catch {
            renderErrorPage(req, res, 'Ups! No se pudo eliminar la categoria')
        }
    }
}

exports.renderFiltroByCategoria = renderFiltroByCategoria
exports.renderCategoriasPage = renderCategoriasPage
exports.crearCategoria = crearCategoria
exports.borrarCategoria = borrarCategoria