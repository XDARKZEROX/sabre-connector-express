'use strict';
var fs = require('fs'),
    assert = require('assert'),
    searchRouter = require('../routes/search'),
    officeIdConstants = require('../config/constants/OfficeIdConstants'),
    searchConstants = require('../config/constants/SearchConstants'),
    http_mocks = require('node-mocks-http'),
    search = require('../app/controller/search'),
    airAvail = require('../app/models/search/AirAvailRQ'),
    negotiation = require('../app/models/search/Negotiation'),
    util = require('../lib/helpers/util'),
    passenger = require('../app/models/search/Passenger');

//Este servicio utiliza Mocking para testear
describe('Sabre Flight Search Testing', function() {
    //desahibilita el timeout por default que tiene el test (3 segundos)
    this.timeout(0);
    var airAvailRQ;
    var passengers = [];
    var fareTypes = [];
    var negotiationTest;

    before(function() {
        negotiationTest = new negotiation();
        airAvailRQ = new airAvail();

        var passenger1 = new passenger('ADT');
        passengers.push(passenger1);

        fareTypes.push("ADT");
        negotiationTest.faretype = fareTypes;

        airAvailRQ.flights = util.readJSONFlights(searchConstants.ROUNDTRIP);
        airAvailRQ.passengers = passengers;
        airAvailRQ.officeID = officeIdConstants.PERU_PUBLIC;
        airAvailRQ.negotiation = negotiationTest;
    });

    it.skip('should search Flights with public fare', function(done) {
        var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/search',
            body: {
                airAvailRQ : airAvailRQ
            }
        });

        var response = http_mocks.createResponse();
        search.searchFlights(request, function(response){
            console.log('end');
            done();
        });
        //console.log(response._getData());

    });
});
