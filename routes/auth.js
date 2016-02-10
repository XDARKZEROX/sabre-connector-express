
var express = require('express');
var router = express.Router();
var authConstants = require("../lib/AuthConstants");

var fs = require('fs');

//No olvidar instalar estas dependencias
var soap = require('soap');
var parseString = require('xml2js').parseString;

/* GET users listing. */
router.get('/', function(req, res, next) {
  //http://www.webservicex.com/globalweather.asmx?WSDL
  var url = 'http://webservices.sabre.com/wsdl/sabreXML1.0.00/usg/SessionCreateRQ.wsdl';
  var args = { };
  soap.createClient(url, function(err, client) {
  	var sheader = {
                    "eb:MessageHeader" : {
                    	"eb:From" : {
                    		"eb:PartyId": authConstants.FROM_PARTY_ID
                    	},
                    	"eb:To" : {
                    		"eb:PartyId": authConstants.TO_PARTY_ID
                    	},
                   		"eb:CPAId": "35VF",
                   		"eb:ConversationId": authConstants.CONVERSATION_ID,
                   		"eb:Service": "Service",
                   		"eb:Action": "SessionCreateRQ"
                   	},
                   	"ns4:Security": {
                   		"ns4:UsernameToken": {
                   			"ns4:Username": "",
                   			"ns4:Password": "",
                   			"ns4:Organization": "",
                   			"ns4:Domain": "DEFAULT"
						          },
						          "ns4:BinarySecurityToken": ""
                   	}
			};
				
    	client.addSoapHeader(sheader, null, "ns4", "http://schemas.xmlsoap.org/ws/2002/12/secext");

  		client.SessionCreateRQ(args, function(err, result) {
			parseString(result.body, function (err, result) {
    	   //console.log(result);
         res.send(result);
			});
		});
		//res.send(client.lastRequest);//console.log(client);
	});
	
});

module.exports = router;
