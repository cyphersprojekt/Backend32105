const express = require('express');
const apiRoutes = require('./routes.js');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use('/api',apiRoutes);

app.listen(8080, () => {
    console.log('listening on port 8080');
    }
)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});