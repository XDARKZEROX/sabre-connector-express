var express = require('express');
var merge = require('merge'),original, cloned;
var moment = require('moment');
authConstants = require("../../config/constants/AuthConstants"),
    authConstantsPE = require("../../config/constants/AuthConstantsPE"),
    authConstantsUS = require("../../config/constants/AuthConstantsUS"),
    coreConstants = require("../../config/constants/CoreConstants"),
    officeIdConstants = require("../../config/constants/OfficeIdConstants"),
    fareTypeSearchConstants = require("../../config/constants/FareTypeForSearchConstants"),
    auth = require("../../lib/helpers/auth"),
    async = require('async'),
    parseString = require('xml2js').parseString;
//var logger = require('../../config/logger');

module.exports = {

    buildBargainFinderMax : function(airAvailRQ, blockedAirlines) {

        var request = merge(_buildPOS(airAvailRQ.officeID), _buildOriginDestinationInformation(airAvailRQ),
            _buildTravelPreferences(blockedAirlines, airAvailRQ),_buildTravelerInfoSummary(airAvailRQ),_buildTPAExtension(),
            {"Version" : "3.2.0", "ResponseType" : "OTA"});

        var OTA_AirLowFareSearchRQ =
        {
            "OTA_AirLowFareSearchRQ" : request
        };

        return OTA_AirLowFareSearchRQ;
    }
}

function _buildPOS (officeId){
    return  {
        "POS": {
            "Source": [
                {
                    "RequestorID": {
                        "CompanyName": {
                            "Code": "TN"
                        },
                        "ID": "1",
                        "Type": "1"
                    },
                    "PseudoCityCode" : officeId
                }
            ]}
    };
}

function _buildOriginDestinationInformation(airAvailRQ){
    var originDestinationInformations = {
        "OriginDestinationInformation" : []
    };
    var rph = 1;
    airAvailRQ.flights.forEach(function(flight, index) {
        flight.Segment.forEach(function(segment, index){
           var originDestinationInformation = {
                "DepartureDateTime" : moment(segment.DepartureDate).format("YYYY-MM-DDThh:mm:ss"),
                "OriginLocation": {
                    "LocationCode": segment.DepartureId
                },
                "DestinationLocation": {
                    "LocationCode": segment.ArrivalId
                },
                "TPA_Extensions": {
                    "Routing": [],
                    "SegmentType": {
                        "Code": "O"
                    },
                    "IncludeVendorPref": []
                },
                "RPH": rph.toString()
            };
            originDestinationInformations.OriginDestinationInformation.push(originDestinationInformation);
            rph++;
        })
    });
    return originDestinationInformations;
}

function _buildTravelPreferences(blockedAirlines, airAvailRQ){

    var tripType = "OneWay";
    if(airAvailRQ.flights.length > 1){
       tripType = "Return";
    }

    var travelPreferences = {
        "TravelPreferences" : {
            "VendorPref": [],
            "CabinPref": [],
            "TPA_Extensions": {
                "ExcludeVendorPref": [],
                "IncludeAlliancePref": [],
                "ExcludeAlliancePref": [],
                "TripType": {
                    "Value": tripType
                },
                "LongConnectTime": {
                    "Enable": true
                },
                "FlightStopsAsConnections": {
                    "Ind": true
                },
                "DiversityParameters": {
                    "Weightings": {
                        "PriceWeight": 10,
                        "TravelTimeWeight": 0
                    },
                    "AdditionalNonStopsNumber": 10
                }
            }
        }
    };

    blockedAirlines['blocked_airlines'].forEach(function(airline){
        var item = {
            "Code" : airline.code
        };
        travelPreferences.TravelPreferences.TPA_Extensions.ExcludeVendorPref.push(item);
    });
    return travelPreferences;
}

function _buildTravelerInfoSummary(airAvailRQ){

    var isPublicFare = false;
    var isPrivateFare = false;

    if(airAvailRQ.fareTypeSearch == fareTypeSearchConstants.PUBLIC_SEARCH){
        isPublicFare = true;
    } else {
        isPrivateFare = true;
    }

    var travelerInfoSummary = {
        "TravelerInfoSummary" : {
            "SeatsRequested": [],
            "AirTravelerAvail": [],
            "PriceRequestInformation": {
                "NegotiatedFareCode": [],
                "AccountCode": [],
                "TPA_Extensions": {
                    "PublicFare": {
                        "Ind": isPublicFare
                    },
                    "PrivateFare": {
                        "Ind": isPrivateFare
                    },
                    "Priority": {
                        "Price": {
                            "Priority": 1
                        },
                        "DirectFlights": {
                            "Priority": 2
                        },
                        "Time": {
                            "Priority": 3
                        },
                        "Vendor": {
                            "Priority": 4
                        }
                    },
                    "Indicators": {
                        "RetainFare": {
                            "Ind": true
                        },
                        "MinMaxStay": {
                            "Ind": true
                        },
                        "RefundPenalty": {
                            "Ind": true
                        },
                        "ResTicketing": {
                            "Ind": true
                        },
                        "TravelPolicy": {
                            "Ind": false
                        }
                    }
                },
                "CurrencyCode": "USD"
            }

        }
    };

    var numberOfADT = 0, numberOfCNN = 0, numberOfINF = 0;
    var totalPax = 0;

    airAvailRQ.passengers.forEach(function(passenger){
        if (passenger.typePassenger =="ADT") {
            numberOfADT++;
        }
        if (passenger.typePassenger == "CHD" || passenger.typePassenger == "CNN") {
            numberOfCNN++;
        }
        if (passenger.typePassenger == "INF") {
            numberOfINF++;
        }
    });

    if(airAvailRQ.fareTypeSearch == fareTypeSearchConstants.PRIVATE_SEARCH){
        totalPax =  numberOfADT + numberOfCNN + numberOfINF;
    } else {
        totalPax =  numberOfADT + numberOfCNN;
    }

    //---------------------------------------------Passenger Quantity---------------------------

    var passengerTypeQuantity = {
        "PassengerTypeQuantity" : []
    };

    if(numberOfADT > 0){
        if(airAvailRQ.fareTypeSearch == fareTypeSearchConstants.PUBLIC_SEARCH){
            var  passengerADT = {"Code": "ADT","Quantity": numberOfADT};
            passengerTypeQuantity.PassengerTypeQuantity.push(passengerADT);
        } else if(airAvailRQ.fareTypeSearch == fareTypeSearchConstants.PRIVATE_SEARCH ||
            airAvailRQ.fareTypeSearch == fareTypeSearchConstants.PUBLIC_AND_PRIVATE_SEARCH) {
            if(airAvailRQ.negotiation != null){
                airAvailRQ.negotiation.forEach(function(negotiation){
                    var  passengerPri = {"Code": negotiation,"Quantity": numberOfADT};
                    passengerTypeQuantity.PassengerTypeQuantity.push(passengerPri);
                });
            }
        }
    }

    if (numberOfCNN > 0) {
        var  passengerCNN = {"Code": "CNN","Quantity": numberOfCNN};
        passengerTypeQuantity.PassengerTypeQuantity.push(passengerCNN);
    }

    if (numberOfINF > 0) {
        var  passengerINF = {"Code": "INF","Quantity": numberOfINF};
        passengerTypeQuantity.PassengerTypeQuantity.push(passengerINF);
    }

    travelerInfoSummary.TravelerInfoSummary.SeatsRequested.push(totalPax);
    travelerInfoSummary.TravelerInfoSummary.AirTravelerAvail.push(passengerTypeQuantity);


    return travelerInfoSummary;
}

function _buildTPAExtension(){

    return {
        "TPA_Extensions": {
            "IntelliSellTransaction": {
                "RequestType": {
                    "Name": "50ITINS"
                }
            }
        }
    };
}

