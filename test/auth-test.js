'use strict';
var fs = require('fs'),
    assert = require('assert'),
	sabreConnector = require("../app/connector/SabreConnector"),
	officeIdConstants = require("../config/constants/OfficeIdConstants");

describe('Sabre Sessions Testing', function() {
	this.timeout(0);
	it.skip('should get Token Session', function(done) {
		var token;
		sabreConnector.sessionCreate(officeIdConstants.PERU_PUBLIC, function (result) {
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
