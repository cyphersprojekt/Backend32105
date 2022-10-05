const express = require('express');
const router = express.Router();
const Contenedor = require('../helpers/contenedor.js');
const apiContenedor = new Contenedor('14-PrimeraEntrega/data/carritos.txt');
const productosContenedor = new Contenedor('14-PrimeraEntrega/data/productos.txt');



router.post('/', (req, res) => {
    const itemToAdd = {
        "id": null,
        "timestamp": Date.now(),
        "productos": [],
    };
    res.send(apiContenedor.save(itemToAdd));
    }
);

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(apiContenedor.deleteById(id))
    }
);

router.get('/:id/productos', (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = apiContenedor.getById(id);
    res.send(carrito.productos)
})

router.post('/:id1/productos/:id2', (req, res) => {
    const carritoId = parseInt(req.params.id1);
    const productoId = parseInt(req.params.id2);
    const carrito = apiContenedor.getById(carritoId);
    const producto = productosContenedor.getById(productoId);
    if (carrito && producto) {
        res.send(apiContenedor.addProductoToCarrito(carritoId, producto))}
    else {
        res.send(`no se encontro alguno de los dos ids`)
    }
})

router.delete('/:id1/productos/:id2', (req, res) => {
})

module.exports = router;