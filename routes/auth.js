
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
                    "mes:MessageHeader" : {
                    	From : {
                    		PartyId: authConstants.FROM_PARTY_ID
                    	},
                    	To : {
                    		PartyId: authConstants.TO_PARTY_ID
                    	},
                   		CPAId: "35VF",
                   		ConversationId: authConstants.CONVERSATION_ID,
                   		Service: "Service",
                   		Action: "SessionCreateRQ"
                   	},
                   	"sec:Security": {
                   	}
				};
    	client.addSoapHeader(sheader);
  		client.SessionCreateRQ(args, function(err, result) {
			parseString(result.body, function (err, result) {
    		//res.send(result);
			});
		});
		res.send(client.lastRequest);//console.log(client);
	});
	
});

module.exports = router;
