'use strict';
//var passenger = require('./Passenger');
var airAvailRQ = function(flights, passengers, officeID, advancedSearch,
                          fareTypeSearch, negotiation, typeSearch){

    this.flights = flights;
    this.passengers = passengers;
    this.officeID = officeID;
    this.advancedSearch = advancedSearch;
    this.fareTypeSearch = fareTypeSearch;
    this.negotiation = negotiation;
    this.typeSearch = typeSearch;

}
/*
airAvailRQ.prototype.test = function() {
    console.log('Este es el officeID ' + this.officeID);
};*/

module.exports = airAvailRQ;
