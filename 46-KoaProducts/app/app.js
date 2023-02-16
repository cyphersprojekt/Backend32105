const Koa = require('koa');
const { koaBody } = require('koa-body');
const productosRouter = require('../routes/productosRouter')
const logger = require('../controllers/logControl').logger

const app = new Koa();

let port;
if (Number(process.argv[2]).toString() === 'NaN') {
    logger.error('Second argument must be a number, got ' + process.argv[2])
    logger.info('Defaulting to 8080')
    port = 8080;
} else {
    port = Number(process.argv[2])
}

app.use(koaBody());
app.use(productosRouter.routes());
app.use(productosRouter.allowedMethods());

app.listen(port, () => {
    logger.info(`App started and listening on port ${port} :)`)
})