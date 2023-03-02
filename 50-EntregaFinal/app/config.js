const dotenv = require('dotenv')

// configType determina que archivo ./config/*.env vamos a cargar,
// necesitamos pasarlo por argv. si no le pasamos nada, o le pasamos un
// ambiente que no exista dentro de la configuracion, defaulteamos a modo dev

// agrego un try catch a la carga del archivo de modo que si no puede cargarlo
// desde ./config, lo busque en el root, porque con railway no voy a tener los archivos
// simplemente lo voy a cargar a traves de la webui
function getConfigValues() {
    let configType = process.argv[2]
    let config
    if (!['dev','prod'].includes(configType)) {
        configType = 'dev'
    }
    try {
        config = dotenv.config({path: `50-EntregaFinal/config/${configType}.env`})
    } catch {
        config = dotenv.config()
    }
    return config.parsed
}

config = getConfigValues()
module.exports = config