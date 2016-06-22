/*
Esta clase de encarga de administrar middlewares como logging o
validacion de campos al momento de enviar los request al connector
 */
var app = express();
//Libreria usada para loggin
var morgan = require('morgan');

app.use(function (req, res, next) {

    //Aca se guardara en un logger lo que llegue del request
    console.log('Time:', Date.now());
    next();
});