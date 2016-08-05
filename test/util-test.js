'use strict';
var fs = require('fs'),
    http = require('http'),
    assert = require('assert'),
    logger = require('../config/logger'),
    auth = require('../lib/helpers/auth'),
    officeIdConstants = require("../config/constants/OfficeIdConstants");

describe('Client logging test', function() {
    this.timeout(0);

    it.skip('should log in Console and File', function(done) {
        logger.log('info', 'Hello distributed log files!');
        logger.info('Hello again distributed logs');

        var xml = require('fs').readFileSync('./text.txt', 'utf8');
        var os = require('os');

        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }

        logger.info('root@47.217.313.37:/opt/2/task/2/fdinfo/fsociety/hscripts# ./fuxsocy.py');
        logger.info('encripted message for: ' + addresses)
        logger.info('fsociety says: ');
        logger.info(xml);
        done();
    });

    it.skip('should get Token Session with UTIL', function(done){
        auth.getAuthString(officeIdConstants.PERU_PUBLIC, function(result){
            console.log(result);
            assert.notStrictEqual(result.token, null);
            done();
        });
    })
});
