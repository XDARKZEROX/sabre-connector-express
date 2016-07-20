'use strict';
var fs = require('fs'),
    assert = require('assert'),
    searchRouter = require('../routes/search'),
    officeIdConstants = require('../config/constants/OfficeIdConstants'),
    searchConstants = require('../config/constants/SearchConstants'),
    http_mocks = require('node-mocks-http'),
    searchController = require('../routes/search'),
    airAvail = require('../app/models/search/AirAvailRQ'),
    negotiation = require('../app/models/search/Negotiation'),
    util = require('../lib/helpers/Util'),
    passenger = require('../app/models/search/Passenger');
var logger = require('../config/logger');

//Este servicio emplear? Mocking para testear
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
        airAvailRQ.flights = util.readJSONFlights(searchConstants.ROUNDTRIP);
        var passenger1 = new passenger('ADT');
        passengers.push(passenger1);
        airAvailRQ.passengers = passengers;
        airAvailRQ.officeID = officeIdConstants.PERU_PUBLIC;

        fareTypes.push("ADT");
        negotiationTest.faretype = fareTypes;
        airAvailRQ.negotiation = negotiationTest;

      //  logger.info(airAvailRQ);

        console.log(airAvailRQ);

    });

    it('should search Flights with public fare', function(done) {

        //logger.log('info', test);

        /*var request  = http_mocks.createRequest({
            method: 'POST',
            url: '/search'
        });*/
        //var response = http_mocks.createResponse();
        /*controller.handle(request, response);
        //routeHandler(request, response);
        console.log(response.getData());
        */
        done();
    });
});
