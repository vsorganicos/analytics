/**
 * Created by FOlive40 on 29/05/2015.
 */
var winston = require('winston');
var fs = require('fs');
var os = require("os");
var hostname = os.hostname();

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            json: false,
            timestamp: false
        }),
        new (winston.transports.DailyRotateFile)( {
            filename: './logs/'+hostname+'.app.log',
            maxsize: 1024 * 1024 * 5,
            level: 'info',
            datePattern: '.dd-MM-yyyy'
        })
    ],
    exceptionHandlers: [
        new (winston.transports.DailyRotateFile)( {
            filename: './logs/'+hostname+'.exceptions.log',
            maxsize: 1024 * 1024 * 5,
            datePattern: '.dd-MM-yyyy'
        })
    ],
    exitOnError: false
});

module.exports.logger = logger;
