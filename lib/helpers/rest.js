var Client = require('node-rest-client').Client;

module.exports = {
    post : function(request, callback) {
        console.log("Rest's POST function: "  + request.event + " in server: "
        + request.service + " with token: " + request.token);







        /*    var args = {
                headers : {Authorization:"Bearer " + authData,
                    "Content-Type":"application/json",

                },
                data : request.query
            };
            var client = new Client();
            var url = "";

            if (request.directUrl !== null) {
                url = request.directUrl;
                args.parameters = null;
            } else {
                url = config.environment + request.service;
            }
            console.log("\t url: %s", url);
            return client.post(url, args, function(data, responseData) {
                response[request.event] = data;
                console.log("\t going on to event %s", request.nextEvent);
                eventEmitter.emit(request.nextEvent);
            });*/
    }
};