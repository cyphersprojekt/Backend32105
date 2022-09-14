const express = require('express');
const apiRoutes = require('./routes.js');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use('/api',apiRoutes);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.listen(8082, () => {
    console.log('listening on port 8082');
    }
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});