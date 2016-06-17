var express = require('express');
var router = express.Router();
var coreConstants = require("../lib/CoreConstants");
var officeIdConstants = require("../lib/OfficeIdConstants");
var fs = require('fs');
var sabreConnector = require("../connector/SabreConnector");
var async = require('async');
var parseString = require('xml2js').parseString;


/* GET users listing. */
router.get('/createSession', function(req, res, next) {
  //var args = {};
  console.log("starts");
  var officeId = officeIdConstants.PERU_PUBLIC;

  sabreConnector.sessionCreate(officeId, function(result){
    res.send("Your session Token is:" + result);

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

function suma(numero_uno,numero_dos,callback){
  setTimeout(function(){
    var resultado = numero_uno + numero_dos;
    callback(resultado);
  }, 5000);
}

module.exports = router;


