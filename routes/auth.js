var express = require('express');
var router = express.Router();

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
                    	/*From : {
                    		PartyId: "999999"
                    	},
                    	To : {
                    		PartyId: "123123"
                    	},
                   		CPAId: "35VF",
                   		ConversationId: "123456@webservices.sabre.com",
                   		Service: "Service",
                   		Action: "SessionCreateRQ"*/
                   	},
                   	"sec:Security": {
                   		/*UsernameToken: {
                   			Username: "7971",
                   			//Password: "WS032511",
                   			Organization: "35VF",
                   			Domain: "DEFAULT"
						},
						BinarySecurityToken: ""*/
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
