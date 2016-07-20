'use strict';
//var passenger = require('./Passenger');
var advancedSearch = function(airlinesCodeForSearch, typeOfCabin,
                              isDirectFlight, flexibleDateType){

    this.airlinesCodeForSearch = airlinesCodeForSearch;
    this.typeOfCabin = typeOfCabin;
    this.isDirectFlight = isDirectFlight;
    this.flexibleDateType = flexibleDateType;

}

module.exports = advancedSearch;