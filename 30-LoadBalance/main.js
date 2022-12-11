const cluster = require('cluster')
const cpus = require('os').cpus().length;

const server = require('./server.js');
const app = require('./app.js').app;
const httpServer = require('./app.js').httpServer;

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
        let port
        try {
            port = Number(process.argv[2]) 
        } catch {
            port = process.argv[2]
        }    
        if (port && port != 'NaN' && typeof port === "number") {
            server.startServer(httpServer, port, null)
        } else {
            server.startServer(httpServer, 8080,`Second argument (port) must be a number, received ${port}\r\n\r\n
            Falling back to port 8080`)
        }
    } else {
        server.startServer(httpServer, 8080,`No port number was specified, defaulting to 8080`)
    }
}