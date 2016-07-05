'use strict';
var fs = require('fs'),
    http = require('http'),
    assert = require('assert'),
	sabreConnector = require("../connector/SabreConnector"),
	officeIdConstants = require("../lib/OfficeIdConstants");
//var winston = require('winston');
var logger = require('../config/logger');

describe('Sabre Sessions Testing', function() {
	this.timeout(0);
	it.skip('should get Token Session', function(done) {
		var token;
		sabreConnector.sessionCreate(officeIdConstants.PERU_PUBLIC, function (result) {
			console.log(result);
			token = result;
			assert.notStrictEqual(token, null);
			done();
		});
	});

	after(function(done) {
		this.skip();
		sabreConnector.sessionClose(function(result){
			console.log(result);
			done();
		});
	});
});



