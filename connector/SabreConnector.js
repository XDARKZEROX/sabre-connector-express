/*
Esta clase se encargara de administrar los URI a los request
 */
var express = require('express');
var authConstants = require("../lib/AuthConstants");
var coreConstants = require("../lib/CoreConstants");
var fs = require('fs');
//No olvidar instalar estas dependencias
var soap = require('soap');
var wsdl = coreConstants.WSDL_SOURCE;

function sessionCreate(officeId){
    var currentOfficeId = officeId;



}

module.exports.sessionCreate = sessionCreate;