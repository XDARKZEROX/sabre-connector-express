var fs = require('fs'),
    dateFormat = require('dateformat');

module.exports = {
    readJSONFlights: function (typeSearch) {
        var jsonFlights = JSON.parse(fs.readFileSync('public/schemas/search/'+typeSearch + '.json', 'utf8'));
        return jsonFlights['Flights'];
    },

    convertTheInputDateForSeach: function (){

        var now = new Date();
        console.log(now);

        return now;
    }
};
