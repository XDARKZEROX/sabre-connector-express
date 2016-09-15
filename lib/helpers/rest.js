var Client = require('node-rest-client').Client;
var logger = require('../../config/logger');

module.exports = {
    post : function(request, callback) {
        console.log("Rest's POST function: "  + request.event + " in server: "
        + request.service + " with token: " + request.token);

        var args = {
                headers : {
                    Authorization:"Bearer " + request.token,
                    "Content-Type":"application/json",
                },
                data : request.query
        };

        var client = new Client();
        var url = "";

        if (request.service !== null) {
            url = "https://api.sabre.com/v1.9.5.1/shop/flights?mode=live";
            args.parameters = null;
        } else {
            //url = config.environment + request.service;
        }

        return client.post(url, args, function(data, response) {
            callback({
                results: data
            });
        });
    }
};