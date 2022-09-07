const express = require('express');
const Contenedor = require('../Cuarta-clase/desafio-2-revised');
const apiRoutes = require('./routes.js');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.json());
app.use('/api',apiRoutes);

app.listen(8080, () => {
    console.log('listening on port 8080');
    }
)