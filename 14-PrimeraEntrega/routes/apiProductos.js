const express = require('express');
const router = express.Router();
const Contenedor = require('../helpers/contenedor.js');
const apiContenedor = new Contenedor('14-PrimeraEntrega/data/productos.txt');

const isAdmin = ((req, res, next) => {
    const isAdmin = req.headers["isadmin"]
    let needsAuth = false
    if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE"){
        needsAuth = true
    }

    if (needsAuth && isAdmin == "true"){
        next()
    }
    else if(!needsAuth){
        next()
    }
    if(needsAuth && (isAdmin == null || isAdmin != "true")){
        res.send({
            error: -1,
            descripcion: `ruta ${req.method} ${req.originalUrl} no autorizada`
        })
    }
})

router.get('/', (req, res) => {
    const data = apiContenedor.getAllData();
    res.send(data)
    }
);

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const prod = apiContenedor.getById(id);
    const error = {'error':'producto no encontrado'}
    if (!prod) {res.send(error) } else { res.send(prod); } }
);

router.post('/', isAdmin, (req, res) => {
    const itemToAdd = req.body;
    res.send(apiContenedor.save(itemToAdd));
    }
);

router.put('/:id', isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const itemToUpdate = req.body;
    res.send(apiContenedor.update(id, itemToUpdate));
    }
);

router.delete('/:id', isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    res.send(apiContenedor.deleteById(id))
    }
);


module.exports = router;