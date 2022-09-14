const express = require('express');
const apiRoutes = require('./routes.js');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use('/api',apiRoutes);


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');



app.listen(8081, () => {
    console.log('listening on port 8081');
    }
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});