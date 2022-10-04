const express = require('express');
const router = express.Router();
const Contenedor = require('../helpers/contenedor.js');
const mainContenedor = new Contenedor('14-PrimeraEntrega/data/productos.txt');

router.get('/productos', (req, res) => {
    const data = mainContenedor.getAllData();
    res.render('productos', {'data': data});
    }
);

router.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const prod = mainContenedor.getById(id);
    const error = {'error':'producto no encontrado'}
    if (!prod) {res.send(error) } else { res.send(prod); } }
);

router.post('/productos', (req, res) => {
    const itemToAdd = req.body;
    mainContenedor.save(itemToAdd);
    const io = req.app.get('socketio')
    const allProducts = mainContenedor.getAllData()
    io.sockets.emit('currentProducts', allProducts)
    res.end()
    }
);

router.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemToUpdate = req.body;
    res.send(mainContenedor.update(id, itemToUpdate));
    }
);

router.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(mainContenedor.deleteById(id))
    }
);


module.exports = router;