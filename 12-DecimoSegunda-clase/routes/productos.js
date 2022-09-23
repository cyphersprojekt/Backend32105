const express = require('express');
const router = express.Router();
const Contenedor = require('../helpers/contenedor.js');
const contenedor1 = new Contenedor('12-DecimoSegunda-clase/data/productos.txt');
const path = require('path');
const handlebars = require('handlebars')

router.get('/productos', (req, res) => {
    const data = contenedor1.getAllData();
    res.render('productos', {'data': data});
    }
);

router.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const prod = contenedor1.getById(id);
    const error = {'error':'producto no encontrado'}
    if (!prod) {res.send(error) } else { res.send(prod); } }
);

router.post('/productos', (req, res) => {
    const itemToAdd = req.body;
    contenedor1.save(itemToAdd);
    const io = req.app.get('socketio')
    const allProducts = contenedor1.getAllData()
    io.sockets.emit('currentProducts', allProducts)
    res.end()
    }
);

router.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemToUpdate = req.body;
    res.send(contenedor1.update(id, itemToUpdate));
    }
);

router.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.send(contenedor1.deleteById(id))
    }
);


module.exports = router;