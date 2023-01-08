const launch = require('./app/launch')
const logger = require('./app/logger');

// let port;
// if (Number(process.argv[2]).toString() === 'NaN') {
//     logger.error('Second argument must be a number, got ' + process.argv[2])
//     logger.info('Defaulting to 8080')
//     port = 8080;
// } else {
//     port = Number(process.argv[2])
// }

let port = Number(process.env.PORT || 8080)

launch.launchStandalone(port)

// if (process.argv.length <= 3) {
//     launch.launchStandalone(port)
// } else {
//     if (process.argv[3] == 'cluster') {
//         launch.launchCluster(port)
//     }
//     if (process.argv[3] == 'fork') {
//         launch.launchForks(port)
//     }
// }