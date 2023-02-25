const launch = require('./app/launch')
const port = Number(process.env.PORT) || 8080
const dotenv = require('dotenv')

// configType determina que archivo ./config/*.env vamos a cargar,
// necesitamos pasarlo por argv. si no le pasamos nada, o le pasamos un
// ambiente que no exista dentro de la configuracion, defaulteamos a modo dev
let configType = process.argv[2]
if (!['dev','prod'].includes(configType)) {
    configType = 'dev'
}

const config = dotenv.config({path: `./config/${configType}.env`})
global.config = config

// si no se definio nada, o se definio cualquier cosa que no
// sean los modos que yo tengo disponibles, lo piso y arranco
// en standalone
let launchMode = process.env.LAUNCH_MODE
if (!['standalone','cluster','fork'].includes(launchMode)) {
    launchMode = 'standalone' 
}

if (launchMode == 'standalone') {
    launch.launchStandalone(port)
}
else if (launchMode == 'cluster') {
    launch.launchCluster(port)
}
else if (launchMode == 'fork') {
    launch.launchForks(port)
}

else {
    logger.error('No se pudo determinar el modo de inicio de la aplicacion, defaulteando a standalone(8080)')
    launch.launchStandalone(8080)
}