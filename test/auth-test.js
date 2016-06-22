'use strict';

var fs = require('fs'),
    http = require('http'),
    assert = require('assert'),
	sabreConnector = require("../connector/SabreConnector"),
	officeIdConstants = require("../lib/OfficeIdConstants");

describe('Sabre Sessions Testing', function() {
	this.timeout(10000);

	it('should get Token Session', function(done) {
		var token;
		sabreConnector.sessionCreate(officeIdConstants.PERU_PUBLIC, function (result) {
			console.log(result);
			token = result;
			assert.notStrictEqual(token, null);
			done();
		});
	});

	after(function(done) {
		console.log("Aca llamamos a SessionClose");
		done();
	});
});