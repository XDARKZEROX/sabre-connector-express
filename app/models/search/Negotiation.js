'use strict';
var negotiation = function(faretype, accountCode,negotiatedFareCode){
    this.faretype = faretype;
    this.accountCode = accountCode;
    this.negotiatedFareCode = negotiatedFareCode;
}

module.exports = negotiation;
