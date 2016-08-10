var express = require('express');
var merge = require('merge'),original, cloned;
authConstants = require("../../config/constants/AuthConstants"),
    authConstantsPE = require("../../config/constants/AuthConstantsPE"),
    authConstantsUS = require("../../config/constants/AuthConstantsUS"),
    coreConstants = require("../../config/constants/CoreConstants"),
    officeIdConstants = require("../../config/constants/OfficeIdConstants"),
    auth = require("../../lib/helpers/auth"),
    async = require('async'),
    parseString = require('xml2js').parseString;
var logger = require('../../config/logger');

module.exports = {

    buildBargainFinderMax : function(airAvailRQ, blockedAirlines , callback) {

        var OTA_AirLowFareSearchRQ;

        OTA_AirLowFareSearchRQ =
        {
            "Version" : "3.2.0",
            "ResponseType" : "OTA"
        }

        var pos = buildPOS(airAvailRQ.officeID);

        var request = merge(OTA_AirLowFareSearchRQ,pos);
        logger.log('info', request);


    }

}

function buildPOS (officeId){
    var POS = {
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
    return POS;
}


/*
var bargainFinderMaxActivity = function() {
    console.log("BargainFinderMax");
    formValue.departureDateTime = formValue.departureDate+"T00:00:00";
    var requestObject = {
        event : "bfm",
        nextEvent : "end",
        service : "/v1.8.6/shop/flights?mode=live",
        query : {
            "OTA_AirLowFareSearchRQ": {
                "OriginDestinationInformation": [
                    {
                        "DepartureDateTime": formValue.departureDate+"T00:00:00",
                        "DestinationLocation": {
                            "LocationCode": formValue.destination
                        },
                        "OriginLocation": {
                            "LocationCode": formValue.origin
                        },
                        "RPH":"1"
                    }
                ],
                "POS": {
                    "Source": [
                        {
                            "RequestorID": {
                                "CompanyName": {
                                    "Code": "TN"
                                },
                                "ID": "REQ.ID",
                                "Type": "0.AAA.X"
                            }
                        }
                    ]
                },
                "TPA_Extensions": {
                    "IntelliSellTransaction": {
                        "RequestType": {
                            "Name": "50ITINS"
                        }
                    }
                },
                "TravelerInfoSummary": {
                    "AirTravelerAvail": [
                        {
                            "PassengerTypeQuantity": [
                                {
                                    "Code": "ADT",
                                    "Quantity": 1
                                }
                            ]
                        }
                    ]
                }
            }
        }
        ,
        directUrl : null

    };
    rest.post(requestObject, sharedContext, eventEmitter);

}
    */