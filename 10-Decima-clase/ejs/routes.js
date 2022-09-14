const express = require('express');
const router = express.Router();
const Contenedor = require('../../4-Cuarta-clase/desafio-2-revised')
const contenedor1 = new Contenedor('./productos.txt')

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
    res.redirect('/api/productos/');
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