var express = require('express');
var router = express.Router();
var fs = require('fs');

//No olvidar instalar estas dependencias
var soap = require('soap');
var parseString = require('xml2js').parseString;

//Esto es una prueba de consumir la wsdl del clima
router.get('/', function(req, res, next) {
  var url = 'http://www.webservicex.com/globalweather.asmx?WSDL';
  var args = {CityName: 'Lima', CountryName: 'PE' };
  soap.createClient(url, function(err, client) {

	   client.GetWeather(args, function(err, result) {
	   if (err) {
	   console.log("error");
	   }else{
		   console.log("good");
		}

	   //imprimir la respuesta en xml
	   //res.send(result.GetWeatherResult);
	   /*parseString(result.GetWeatherResult, function (err, result) {
	   res.json(result);
	   });*/
	   });
   });
  	res.send("index");
});

module.exports = router;



