var express = require('express'),
    router = express.Router(),
    officeIdConstants = require("../../lib/OfficeIdConstants"),
    fs = require('fs'),
    sabreConnector = require("../connector/SabreConnector"),
    async = require('async'),
    parseString = require('xml2js').parseString;

exports.searchFlights = function(req, res) {

    res.send('here in controller');

};
