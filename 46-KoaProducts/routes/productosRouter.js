const Router = require('koa-router');
const router = new Router()
const { koaBody } = require('koa-body');

const ProductosHelper = require('../db/mongooseObjIface').getProductosHelper()
const ProductosDto = require('../db/dtos/productosDto')

router.get('/', async(ctx, next) => {
    ctx.body = 'mit der App ist alles gut 👍'
})

router.get('/productos', async(ctx, next) => {
    const products = await ProductosHelper.getAll()
    ctx.body = products;
})

router.post('/productos', koaBody(), async(ctx, next) => {
    const newProduct = new ProductosDto(
        ctx.request.body.name,
        ctx.request.body.price,
        ctx.request.body.thumbnail
    )
    try {
        const newProductId = await ProductosHelper.insert(newProduct)
        ctx.body = newProductId
    } catch(e) {
        const error = `Hubo un error al procesar tu solicitud, \r\n ${e}`
        ctx.body = error
    }
})

router.put('/productos/:id', koaBody(), async(ctx, next) => {
    const reqId = ctx.params.id;
    const newProduct = new ProductosDto(
        ctx.request.body.name,
        ctx.request.body.price,
        ctx.request.body.thumbnail
    )
    try {
        await ProductosHelper.overwrite(reqId, newProduct)
        ctx.body = `Se actualizo el producto con id ${reqId} \r\n ${newProduct}`
    } catch(e) {
        const error = `Hubo un error al procesar tu solicitud, \r\n ${e}`
        ctx.body = error
    }
})

router.delete('/productos/:id', async(ctx, next) => {
    const reqId = ctx.params.id;
    try {
        await ProductosHelper.delete(reqId)
        ctx.body = `Se elimino el producto con id ${reqId}`
    } catch(e) {
        const error = `Hubo un error al procesar tu solicitud, \r\n ${e}`
        ctx.body = error
    }
})

module.exports = router