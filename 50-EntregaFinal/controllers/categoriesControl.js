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
    let reqUser = req.user
    if(!isAdmin(reqUser)) {
        renderErrorPage(req, res, 'Solo los administradores tienen acceso a esta pagina')
    } else {
        let allCategories = await categoriesHelper.getAll()
        data = {reqUser, allCategories}
        res.render('categorias')
    }
}

async function crearCategoria(req, res) {
    let reqUser = req.user
    let newCategory = req.body.newCategory
    if (!isAdmin(reqUser)) {
        renderErrorPage(req, res, 'Solo los administradores pueden agregar categorias')
    } else {
        if (categoriesModel.findOne({category_name: newCategory})) {
            renderErrorPage(req, res, 'Ya existe una categoria con ese nombre')
        } else {
            try {
                await categoriesHelper.insert(newCategory)
                renderSuccessPage(req, res, `Se creo la categoria ${newCategory}`)
            } catch {
                renderErrorPage(req, res, 'Ups! no se pudo crear la categoria')
            }
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

exports.crearCategoria = crearCategoria
exports.borrarCategoria = borrarCategoria