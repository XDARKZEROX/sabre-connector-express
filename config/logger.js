var winston = require('winston');
//var Loggly = require('winston-loggly').Loggly;
//var loggly_options={ subdomain: "mysubdomain", inputToken: "efake000-000d-000e-a000-xfakee000a00" }
//logger.add(Loggly, loggly_options);

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            json: false
        }),
        new (winston.transports.File) ({
            filename: '../logs/development.log',
            colorize: true,
            json: true
        })
    ]
});

/*
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: '../logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});*/

/*
winston.add(
    winston.transports.File, {
        filename: '../logs/development.log',
        level: 'info',
        eol: 'rn', // for Windows, or `eol: ÅenÅf,` for *NIX OSs
        json: true,
        timestamp: true
    }
);*/

//logger.info('Chill Winston, the logs are being captured 3 ways- console, file, and Loggly');
module.exports=logger;
