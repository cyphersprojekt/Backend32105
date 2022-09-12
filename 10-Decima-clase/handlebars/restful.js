const express = require('express');
const apiRoutes = require('./routes.js');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');

app.use(express.urlencoded({extended: true}));
app.use('/api',apiRoutes);


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');



app.listen(8080, () => {
    console.log('listening on port 8080');
    }
);

app.get('/', (req, res) => {
    res.render('home');
});