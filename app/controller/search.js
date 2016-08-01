var express = require('express'),
    router = express.Router(),
    officeIdConstants = require("../../config/constants/OfficeIdConstants"),
    fs = require('fs'),
    sabreConnector = require("../connector/SabreConnector"),
    async = require('async'),
    parseString = require('xml2js').parseString;

exports.searchFlights = function(req, res) {
    console.log('We have a request for %s', req.method, req.url);

    var airAvailRS;





    res.status(200).json(req.body);
    res.end();
};
