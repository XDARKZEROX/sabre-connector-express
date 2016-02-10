var express = require('express');
var router = express.Router();
var fs = require('fs');

//No olvidar instalar estas dependencias
var soap = require('soap');
var parseString = require('xml2js').parseString;

router.get('/', function(req, res, next) {
  //http://www.webservicex.com/globalweather.asmx?WSDL
  var url = 'http://www.webservicex.com/globalweather.asmx?WSDL';
  var args = {CityName: 'Lima', CountryName: 'PE' };
  soap.createClient(url, function(err, client) {
  	client.GetWeather(args, function(err, result) {
		parseString(result.GetWeatherResult, function (err, result) {
    		res.json(result);
		});
		});
  	//res.send(client.lastRequest);
	});
});

module.exports = router;



