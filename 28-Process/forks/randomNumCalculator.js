const end = 1000;
const start = 0;
let amount;


let date1 = new Date();
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

if (process.argv.length > 2) {
    amount = process.argv[2]
} else {
    amount = 1000000;
}

let nums = [];
for (let i = 0; i < amount; i++) {
    generated = between(start, end)
    nums.push(generated)
}

let results = [];
nums.forEach((x) => {
    let idx = results.findIndex(obj => obj.num === x);
    if (idx != -1) {
        results[idx].count++;
    } else {
        results.push( {
            "num": x,
            "count": 1
        } )
        
    }
})
let date2 = new Date()

//console.log(date2 - date1)