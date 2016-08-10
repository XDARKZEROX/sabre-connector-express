var Client = require('node-rest-client').Client;
coreConstants = require("../../config/constants/CoreConstants");
var tokenString = '';
var expirationDate;
var response;
module.exports = {

    getAuthString : function(officeId, callback) {
        console.log(officeId);
        var key = "VjE6Nzk3MTozNVZGOkFB:V1MwMzI1MTE=";

        if(officeId === officeIdConstants.USA_PUBLIC){
            key = "VjE6Nzk3MjpRWTRHOkFB:V1MwNzAyMTI=";
        }

        var buffer = new Buffer(key);
        if (tokenString.length == 0 || expirationDate == null){ //|| expirationDate.isBefore()
            var client = new Client();
            var arguments = {
                parameters: { grant_type: "client_credentials" },
                headers: { "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization":  "Basic " + buffer.toString('base64')}
            };

            client.post(coreConstants.PRODUCTION_SABRE_REST, arguments, function (data, response) {
                if (data.access_token != undefined || data.access_token != '') {
                    callback({
                        token: data.access_token,
                        expires_in: data.expires_in,
                        status: 'OK',
                        message: 'success'
                    });
                } else {
                    callback({
                        token: null,
                        expires_in: null,
                        status: 'ERR',
                        message: 'failed in authenticate Sabre REST'
                    });
                }
            });
        } else {
            console.log('token alive');
            //Si el token sigue activo
            /*return new Promise(function(accept, reject) {
                console.log("Just reading the previously aquired token...");
                accept(tokenString);
            })*/
        }
    }
};