'use strict';
var fs = require('fs'),
    assert = require('assert'),
	sabreConnector = require("../app/connector/connector"),
	officeIdConstants = require("../config/constants/OfficeIdConstants");

describe('Sabre Sessions Testing', function() {
	this.timeout(0);
	it.skip('should get Token Session', function(done) {
		sabreConnector.sessionCreate(officeIdConstants.PERU_PUBLIC, function (result) {
			console.log(result);
			//assert.notStrictEqual(result.token, null);
			done();
		});


	});
});
