const dotenv = require('dotenv')

// configType determina que archivo ./config/*.env vamos a cargar,
// necesitamos pasarlo por argv. si no le pasamos nada, o le pasamos un
// ambiente que no exista dentro de la configuracion, defaulteamos a modo dev

function getConfigValues() {
    let configType = process.argv[2]
    if (!['dev','prod'].includes(configType)) {
        configType = 'dev'
    }
    const config = dotenv.config({path: `50-EntregaFinal/config/${configType}.env`})
    return config.parsed
}

config = getConfigValues()
module.exports = config