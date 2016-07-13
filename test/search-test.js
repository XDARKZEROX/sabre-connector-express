'use strict';
var fs = require('fs'),
    http = require('http'),
    assert = require('assert'),
    searchRouter = require("../routes/search"),
    officeIdConstants = require("../lib/OfficeIdConstants");
var logger = require('../config/logger');
var http_mocks = require('node-mocks-http');
var searchController = require('../routes/search');
var airAvail = require('../app/models/search/AirAvailRQ');

//Este serviio emplear? Mocking para testear
describe('Sabre Flight Search Testing', function() {
    //desahibilita el timeout por default que tiene el test
    this.timeout(0);

    it('should search Flights with public fare', function(done) {

        var test = new airAvail('Alexander','Guzman');
        console.log(test);

        /*var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/search'
        });*/
        //var response = http_mocks.createResponse();

        /*controller.handle(request, response);
        //routeHandler(request, response);
        console.log(response.getData());
        */done();
    });
});

