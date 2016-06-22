var express = require('express');
var router = express.Router();
var officeIdConstants = require("../lib/OfficeIdConstants");
var fs = require('fs');
var sabreConnector = require("../connector/SabreConnector");
var async = require('async');
var parseString = require('xml2js').parseString;


/* GET users listing. */
router.get('/createSession', function(req, res, next) {
  //var args = {};
  async.series([
    function(callback) {
      sabreConnector.sessionCreate(officeId, function(result){
        console.log(result);
        callback(result);
      });
    },
    function(callback){
      console.log(callback);
    }
  ],function (err, result){
    console.log("complete");
  });




  /*
  async.series([
    function(callback) {
      setTimeout(function () {
        callback(null, 'llegamos!');
      }, 5000)
    }
  ],function (err, result){
    console.log("complete");
    res.send(result);
  });
  */








  //rs.then(console.log, console.error);
 // console.log("end");


});

module.exports = router;


