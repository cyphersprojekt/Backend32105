const cluster = require('cluster')
const cpus = require('os').cpus().length;

const server = require('./app/server.js');
const app = require('./app/app.js').app;
const httpServer = require('./app/app.js').httpServer;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
    console.log(`worker ${process.pid} started`);
    if (process.argv.length > 2) {
        let port = Number(process.argv[2])
        if (port != 'NaN') {
            server.startServer(httpServer, port, null)
        } else {
            server.startServer(httpServer, 8080,`Second argument (port) must be a number, received ${port}\r\n\r\n
            Falling back to port 8080`)
        }
    } else {
        server.startServer(httpServer, 8080,`No port number was specified, defaulting to 8080`)
    }
}