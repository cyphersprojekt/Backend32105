const launch = require('./app/launch')

Number(process.argv[2]) != NaN ? port = Number(process.argv[2]) : port = 8080

if (process.argv.length <= 3) {
    launch.launchStandalone(port)
} else {
    if (process.argv[3] == 'cluster') {
        launch.launchCluster(port)
    }
    if (process.argv[3] == 'fork') {
        launch.launchForks(port)
    }
}