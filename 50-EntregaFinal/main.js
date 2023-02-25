const launch = require('./app/launch')
const logger = require('./controllers/logControl').logger
const config = require('./app/config')

// si no se definio nada, o se definio cualquier cosa que no
// sean los modos que yo tengo disponibles, lo piso y arranco
// en standalone
let launchMode = config.LAUNCH_MODE
if (!['standalone','cluster'].includes(launchMode)) {
    launchMode = 'standalone' 
}

let port = config.PORT || 8080

if (launchMode == 'standalone') {
    launch.launchStandalone(port)
}
else if (launchMode == 'cluster') {
    launch.launchCluster(port)
}
else {
    logger.error('No se pudo determinar el modo de inicio de la aplicacion, defaulteando a standalone(8080)')
    launch.launchStandalone(8080)
}