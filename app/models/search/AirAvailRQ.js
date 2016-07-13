'use strict';
var airAvailRQ = function(passengers , officeID, avancedSearch,
                         fareTypeSearch, negotiation, typeSearch){

    this.passengers = passengers;
    this.officeID = officeID;
    this.avancedSearch = avancedSearch;
    this.fareTypeSearch = fareTypeSearch;
    this.negotiation = negotiation;
    this.typeSearch = typeSearch;
}

airAvailRQ.prototype.test = function() {
    console.log('Este es el officeID ' + this.officeID);
};

module.exports = airAvailRQ;

/*
 private List<Flight> flights;
 private List<Passenger> passengers;
 private String officeID;
 private AdvancedSearch advancedSearch;
 private String fareTypeSearch;
 private Negotiation negotiation;
 private String typeSearch;
  */