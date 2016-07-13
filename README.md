# Sabre Connector Express [![version][project-version]][npm-url]
> Un servicio REST construido en NodeJS y el framework ExpressJS4

Un servicio REST que permite la búsqueda de vuelos utilizando el motor de Sabre (SOAP).

- [Estructura del Proyecto:](#estructura-del-proyecto)
- [Enviroments:](#enviroments)
- [Servicios:](#servicios)
    - [SessionCreate](#SessionCreate)
    - [SessionClose](#SessionClose)
    - [BargainFinderMax](#BargainFinderMax)

## Estructura del Proyecto

En desarrollo.

## Enviroments
El proyecto posee constantes que serán cargadas dependiendo del Enviroment ('developtment' o 'production').
Por defecto el proyecto se inicia siempre en development mode.

Para cambiar de entorno de desarrollo:
* Abrir la consola y ubicarse en el proyecto.
* Digitar 'set NODE_ENV=production' o set 'NODE_ENV=development' segun el entorno en que usará (digitarlo sin comillas)
* Levantar el proyecto digitando: node app.js

```
  set NODE_ENV=production o NODE_ENV=development
```

## Servicios
### SessionCreate:
Este servicio permite la autenticación a Sabre para poder generar los demás servicios (búsqueda, reserva, cancelación, etc) retornando un token de sesión que se utilizará al momento de invocar a los demás servicios.

En SOAP este servicio solo permite una cantidad de limitada de sesiones activas por lo que cada vez que se llame este servicio posteriormente deberá invocarse el servicio de `SessionClose` para liberar la sesión y evitar la sobrecarga. 

### SessionClose:
Este servicio permite liberar la sesión activa o en uso para evitar la sobrecarga de user tokens (recordar que SessionCreate tiene un número limitado de conexiones abiertas).

Este servicio debe ser ejecutado despues de llamar al servicio `SessionCreate` y recibiendo como parámetro el token de sesión que SessionCreate otorga en su response.

### BargainFinderMax:
En desarrollo.

[project-version]: https://img.shields.io/badge/version-1.0.1-brightgreen.svg
[npm-url]: https://npmjs.org/package/soap
