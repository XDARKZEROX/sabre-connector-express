var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    sabreConnector = require("../app/connector/SabreConnector"),
    async = require('async'),
    parseString = require('xml2js').parseString;
    searchController = require("../app/controller/search");

/* GET users listing. */
router.post('/', searchController.searchFlights);

router.post('/test', function(req, res, next) {
    res.json("here");
  //  res.send('complete');
    /*
    async.series([
        function(callback) {
            console.log('first');
            callback();
        },
        function(callback) {
            console.log('second');
            callback();
        }
    ],function (err, result){
        console.log("complete");
        res.send(result);
    });*/
});

module.exports = router;
