const express = require('express');
const router = express.Router();
const random = require('random');
const Contenedor = require('../Cuarta-clase/desafio-2-revised.js');
const contenedor1 = new Contenedor('productos.txt')


// console.log(contenedor1.getAllData())

router.get('/productos', (req, res) => {
    const data = contenedor1.getAllData();
    res.send(data);
        }
    )

router.get('/productoRandom', (req, res) => {
    let randomIdx = random.int((min = 0), (max = contenedor1.getAllData().length+1))
    const data = contenedor1.getAllData();
    //const randomProduct = contenedor1.getById(randomIdx);
    res.send(data[randomIdx]);
        }
    )




module.exports = router;