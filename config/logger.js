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
            filename: './logs/development.log',
            json: true
            //,eol: '\n'
        })
    ]
});

/*
var myCustomLevels = {
    levels: {
        foo: 0,
        bar: 1,
        baz: 2,
        foobar: 3
    },
    colors: {
        foo: 'blue',
        info: 'green',
        baz: 'yellow',
        cc: 'red'
    }
};
winston.addColors(myCustomLevels.colors);
*/

module.exports=logger;
