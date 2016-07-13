/*
Esta clase se encargara de administrar los URI a los request
 */
var express = require('express');
var merge = require('merge'),original, cloned;
    authConstants = require("../../lib/AuthConstants"),
    authConstantsPE = require("../../lib/AuthConstantsPE"),
    authConstantsUS = require("../../lib/AuthConstantsUS"),
    coreConstants = require("../../lib/CoreConstants"),
    officeIdConstants = require("../../lib/OfficeIdConstants"),
    fs = require('fs'),
    async = require('async'),
    soap = require('soap'),
    parseString = require('xml2js').parseString;
var securityHolder;
var messageHeader;
var logger = require('../../config/logger');
exports.sessionCreate = function (officeId, callback) {
   // logger.log('info','starts sessionCreate')

    var cPaid = "";
    var username = "";
    var password = "";
    var organization = "";
    if(officeId === officeIdConstants.PERU_PRIVATE){
        username = authConstantsPE.USER;
        password = authConstantsPE.PASSWORD;
        organization = authConstantsPE.OFFICE_ID;
        cPaid = "35VF";
    } else if(officeId === officeIdConstants.USA_PUBLIC){
        username = authConstantsUS.USER;
        password = authConstantsUS.PASSWORD;
        organization = authConstantsUS.OFFICE_ID;
        cPaid = "QY4G";
    } else {
        username = authConstantsPE.USER;
        password = authConstantsPE.PASSWORD;
        organization = authConstantsPE.OFFICE_ID;
        cPaid = "35VF";
    }

    messageHeader = {
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
            "eb:Action": "SessionCreateRQ"
        }
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

    securityHolder=security;
    var header = merge(messageHeader,security);

    soap.createClient(coreConstants.WSDL_SESSION_CREATE, function(err, client) {
        client.addSoapHeader(header, null, "ns4", "http://schemas.xmlsoap.org/ws/2002/12/secext");
        client.SessionCreateRQ("", function(err, result) {
            if (result.statusCode == 500) return callback(result.body);
            logger.log('info',client.lastRequest);
            logger.log('info',result.body);
            parseString(result.body, function (err, result) {
                    token = result["soap-env:Envelope"]["soap-env:Header"][0]
                         ["wsse:Security"][0]["wsse:BinarySecurityToken"][0]["_"];
                     securityHolder["ns4:Security"]["ns4:BinarySecurityToken"] = token;
                     callback(token);
            });
        });
    });
}

exports.sessionClose = function(callback){
    securityHolder["ns4:Security"]["ns4:BinarySecurityToken"] = token;
    messageHeader["eb:MessageHeader"]["eb:Action"]= "SessionCloseRQ";
    var header = merge(messageHeader,securityHolder);
    soap.createClient(coreConstants.WSDL_SESSION_CLOSE, function(err, client) {
        client.addSoapHeader(header, null, "ns4", "http://schemas.xmlsoap.org/ws/2002/12/secext");
        client.SessionCloseRQ("", function(err, result) {
            if (result.statusCode == 500) return callback(result.body);
            logger.log('info',client.lastRequest);
            logger.log('info',result.body);
            parseString(result.body, function (err, result) {
                callback(result);
            });
        });
    });
}

