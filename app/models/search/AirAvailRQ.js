'use strict';
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

module.exports = airAvailRQ;
