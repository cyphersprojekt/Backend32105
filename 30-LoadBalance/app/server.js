function startServer(server, port, info) {
    if (info) console.log(info);
    server.listen(port, ()=>{
        console.log(`App started and listening on port ${port} :)`)
    })
}

exports.startServer = startServer;