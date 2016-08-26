var express = require('express'),
    router = express.Router(),
    officeIdConstants = require("../../config/constants/OfficeIdConstants"),
    authConstantsPE= require("../../config/constants/AuthConstantsPE"),
    authConstantsUS = require("../../config/constants/AuthConstantsUS"),
    fs = require('fs'),
    async = require('async'),
    parseString = require('xml2js').parseString,
    auth = require('../../lib/helpers/auth'),
    searchBuilder = require('../../lib/builder/searchBuilder');
var logger = require('../../config/logger');
module.exports = {

    searchFlights : function (req, res) {
        console.log('We have a request for %s', req.method, req.url);
        var airAvailRQ = req.body['airAvailRQ'];
        var blockedAirlines = JSON.parse(fs.readFileSync('public/resources/blockedAirlines.json', 'utf8'));

        blockedAirlines['blocked_airlines'].forEach(function(item, index) {
            if((airAvailRQ.officeID === authConstantsPE.OFFICE_ID && item.code === "JL")
             || (airAvailRQ.fareTypeSearch == 1 && item.code === "DL")){
                blockedAirlines['blocked_airlines'].splice(index, 1);
            }
        });
        var sabre_session;
        async.series([
            //Obtenemos el token de sesion (falta validarlo dependiendo del status)
            function(callback) {
                auth.getAuthString(airAvailRQ.officeID, function(result){
                    sabre_session = result.token;
                    callback();
                });
            },
            //procedemos a armar el request y luego lo enviamos a Sabre
            function(callback){
                searchBuilder.buildBargainFinderMax(airAvailRQ , blockedAirlines);
                callback();
            }
        ],function(err) {
            //console.log('second');
            //console.log(sabre_session);

            //res.status(200).json(req.body);
            //res.end();
        });
    }
}

