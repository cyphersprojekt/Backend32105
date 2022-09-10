const express = require('express');
const productosRoute = require('./productos.js')
const app = express();
app.use(productosRoute)


app.listen(8080, () => {
    console.log('Listening on port 8080');
})