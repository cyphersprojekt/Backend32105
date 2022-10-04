const express = require('express');
const router = express.Router();
const Contenedor = require('../helpers/contenedor.js');
const apiContenedor = new Contenedor('14-PrimeraEntrega/data/carritos.txt');



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

module.exports = router;