const express = require('express')
const router = express.Router()
const child_process = require('child_process')


router.get('/', async (req, res) => {
    console.log(req.query)
    let amount = Number(req.query.qty);
    let forked = child_process.fork('./28-Process/forks/randomNumCalculator.js');
    let data
    if (amount && amount != 'NaN') {
        forked.send(`Qty: ${amount}`);
    } else {
        forked.send('Default');
    }
    forked.on('message', (msg) => {
        if (typeof msg === 'string') {
            console.log(msg);
        }
        else {
            data = JSON.stringify(msg)
            res.render('nums', {data: data}) 
        }
  
    })

});
module.exports = router;