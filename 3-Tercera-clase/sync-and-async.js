function callTo(name) {
    return console.log(`Calling to ${name}`);
}

let calling = (name, cb) => {
    return cb(name)
}

calling('Juan', callTo);

function timer(msg) {
    const date = new Date();
    console.log(`${date}: ${msg}`);
}

function getUserName(name) {
    setTimeout(() => {
        cb(name);
    }, 3000);
}

