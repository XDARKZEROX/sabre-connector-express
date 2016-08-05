var express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  async = require('async'),
  parseString = require('xml2js').parseString;

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


