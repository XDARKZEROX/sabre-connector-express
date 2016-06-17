/*
Esta clase se encargara de administrar los URI a los request
 */
var express = require('express');
var merge = require('merge'),original, cloned;
var authConstants = require("../lib/AuthConstants");
var authConstantsPE = require("../lib/AuthConstantsPE");
var authConstantsUS = require("../lib/AuthConstantsUS");
var coreConstants = require("../lib/CoreConstants");
var officeIdConstants = require("../lib/OfficeIdConstants");
var fs = require('fs');
var async = require('async');
//No olvidar instalar estas dependencias
var soap = require('soap');
var wsdl = coreConstants.WSDL_SOURCE;
var parseString = require('xml2js').parseString;

exports.sessionCreate = function (officeId, callback) {

    console.log("starts sessionCreate");
    var messageHeader = buildMessageHeader("SessionCreateRQ");
    var username = "";
    var password = "";
    var organization = "";
    if(officeId === officeIdConstants.PERU_PRIVATE){
        username = authConstantsPE.USER;
        password = authConstantsPE.PASSWORD;
        organization = authConstantsPE.OFFICE_ID;
    } else if(officeId === officeIdConstants.USA_PUBLIC){
        username = authConstantsUS.USER;
        password = authConstantsUS.PASSWORD;
        organization = authConstantsUS.OFFICE_ID;
    } else {
        username = authConstantsPE.USER;
        password = authConstantsPE.PASSWORD;
        organization = authConstantsPE.OFFICE_ID;
    }

    var security = {
        "ns4:Security": {
            "ns4:UsernameToken": {
                "ns4:Username": username,
                "ns4:Password": password,
                "ns4:Organization": organization,
                "ns4:Domain": "DEFAULT"
            },
            "ns4:BinarySecurityToken": ""
        }
    };

    var header = merge(messageHeader,security);
    soap.createClient(wsdl, function(err, client) {
        client.addSoapHeader(header, null, "ns4", "http://schemas.xmlsoap.org/ws/2002/12/secext");
        client.SessionCreateRQ("", function(err, result) {
            if (result.statusCode == 500) return callback(result.body);
                    parseString(result.body, function (err, result) {
                        callback(result["soap-env:Envelope"]["soap-env:Header"][0]
                            ["wsse:Security"][0]["wsse:BinarySecurityToken"][0]["_"]);
            });
        });
    });
}

function buildMessageHeader(serviceName, officeId){

    var cPaid = "";
    if(officeId === officeIdConstants.PERU_PRIVATE){
        cPaid = "35VF";
    } else if(officeId === officeIdConstants.USA_PUBLIC){
        cPaid = "QY4G";
    } else {
        cPaid = "35VF";
    }

    var messageHeader = {
        "eb:MessageHeader": {
            "eb:From": {
                "eb:PartyId": authConstants.FROM_PARTY_ID
            },
            "eb:To": {
                "eb:PartyId": authConstants.TO_PARTY_ID
            },
            "eb:CPAId": cPaid,
            "eb:ConversationId": authConstants.CONVERSATION_ID,
            "eb:Service": "Service",
            "eb:Action": serviceName
        }
    }
    return messageHeader;
}

//module.exports.sessionCreate = sessionCreate;