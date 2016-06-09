var express = require('express');
var router = express.Router();
var authConstants = require("../lib/AuthConstants");
var coreConstants = require("../lib/CoreConstants");
var fs = require('fs');
var sabreConnector = require("../middlewares/SabreConnector")

//No olvidar instalar estas dependencias
var soap = require('soap');
var parseString = require('xml2js').parseString;
var wsdl = coreConstants.WSDL_SOURCE;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var args = { };
  soap.createClient(wsdl, function(err, client) {
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
			res.send(result.body);
//      console.log(result);
      /*parseString(result.body, function (err, result) {
    	   console.log(result);
         //res.send(result);
			});*/
		});
		//res.send(client.lastRequest);//console.log(client);
	});
	
});

module.exports = router;


