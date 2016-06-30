'use strict';
var fs = require('fs'),
    http = require('http'),
    assert = require('assert'),
    logger = require('../config/logger');

describe('Client logging test', function() {
    it.skip('should log in Console and File', function(done) {
        logger.log('info', 'Hello distributed log files!');
        logger.info('Hello again distributed logs');
        done();
    });
});
