var fs = require('fs');

module.exports = {
    readJSONFlights: function (typeSearch) {
        var jsonFlights = JSON.parse(fs.readFileSync('public/schemas/search/'+typeSearch + '.json', 'utf8'));
        return jsonFlights['Flights'];
    },

};
