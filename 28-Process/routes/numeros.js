const express = require('express')
const router = express.Router()
const child_process = require('child_process')


router.get('/', async (req, res) => {
    let amount = Number(req.query);
    let forked = child_process.fork('./28-Process/forks/randomNumCalculator.js');
    if (amount && amount != 'NaN') {
        forked.send(`Qty: ${amount}`);
    } else {
        forked.send('Default');
    }
    let data
    forked.on('message', (msg) => {
        if (typeof msg === 'string') {
            console.log(msg);
        }
        else {
            data = msg;
        }        
    })
    res.render('nums', {data: data})
});
module.exports = router;