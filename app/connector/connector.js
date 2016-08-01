var express = require('express');
var merge = require('merge'),original, cloned;
authConstants = require("../../config/constants/AuthConstants"),
    authConstantsPE = require("../../config/constants/AuthConstantsPE"),
    authConstantsUS = require("../../config/constants/AuthConstantsUS"),
    coreConstants = require("../../config/constants/CoreConstants"),
    officeIdConstants = require("../../config/constants/OfficeIdConstants"),
    fs = require('fs'),
    async = require('async'),
    Client = require('node-rest-client').Client,
    parseString = require('xml2js').parseString;
var logger = require('../../config/logger');
var client = new Client();
exports.sessionCreate = function (officeId, callback) {

    //API Key de Peru por default
    var key = "VjE6Nzk3MTozNVZGOkFB:V1MwMzI1MTE=";

    if(officeId === officeIdConstants.USA_PUBLIC){
        key = "VjE6Nzk3MjpRWTRHOkFB:V1MwNzAyMTI=";
    }

    var buffer = new Buffer(key);
    var arguments = {
        parameters: { grant_type: "client_credentials" },
        headers: { "Content-Type": "application/x-www-form-urlencoded",
            "Authorization":  "Basic " + buffer.toString('base64')}
    };

    var request = client.post(coreConstants.PRODUCTION_SABRE_REST, arguments, function (data, response) {
        if(data.access_token != undefined || data.access_token != ''){
            callback({
                token : data.access_token,
                status : 'OK',
                message: 'success'
            })
        } else {
            callback({
                token : null,
                status : 'ERR',
                message: 'failed in authenticate Sabre REST'
            })
        }
    });

    request.on('requestTimeout', function (req) {
        console.log("request has expired");
        req.abort();
    });

    request.on('responseTimeout', function (res) {
        console.log("response has expired");
    });
}

exports.sessionClose = function(callback){

}

exports.bargainFinderMax = function(callback){

}
