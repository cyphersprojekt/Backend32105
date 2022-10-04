const express = require('express');
const router = express.Router();
const Contenedor = require('../helpers/contenedor.js');
const apiContenedor = new Contenedor('14-PrimeraEntrega/data/productos.txt');
const apiCart = new Contenedor('14-PrimeraEntrega/data/cart.txt');

router.get('/productos', (req, res) => {
    const data = apiContenedor.getAllData();
    res.send(data)
    }
);

router.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const prod = apiContenedor.getById(id);
    const error = {'error':'producto no encontrado'}
    if (!prod) {res.send(error) } else { res.send(prod); } }
);

router.post('/productos', (req, res) => {
    const itemToAdd = req.body;
    res.send(contenedor1.save(itemToAdd));
    }
);

router.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemToUpdate = req.body;
    res.send(apiContenedor.update(id, itemToUpdate));
    }
);

router.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(apiContenedor.deleteById(id))
    }
);


module.exports = router;