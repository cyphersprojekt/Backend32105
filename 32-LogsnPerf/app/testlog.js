const { createLogger, format, transports } = require("winston");


const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    };

const log2c = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
    transports: [new transports.Console()],
});

const log2f = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
    transports: [new transports.File({
        filename: '../logs/sarasa.log'
    })]
})

log2c.info('tararara')
log2f.info('tararara2')