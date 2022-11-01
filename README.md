# Coderhouse backend, comision 32105

## 01/11/22
#### Segunda entrega del trabajo final
* npm run segundaentrega
    * rutas de productos:
        * GET /api/productos/
        * GET /api/productos/:id
        * POST /api/productos/ (mandando como json el objeto a insertar en el body)
        * PUT /api/productos/:id (mandando como json el objeto modificado en el body)
        * DELETE /api/productos/:id
    * rutas de carritos:
        * GET /api/carrito/
        * GET /api/carrito/:id/productos
        * POST /api/carrito/
        * DELETE /api/carrito/:id
        * POST /api/carrito/:id_carrito/productos/:id_producto
        * DELETE /api/carrito/:id_carrito/productos/:id_producto

Setear el motor de base de datos modificando el .env con:
````
dbType="mongo"
````
ó
````
dbType="firestore"
````
En el caso de mongo, se debe generar un archivo firestore-config.js dentro de 20-SegundaEntrega/helpers/firestore-config.js con el formato:
````
const firebase =  {
    "type": 
    "project_id": 
    "private_key_id": 
    "private_key": 
    "client_email":
    "client_id": 
    "auth_uri": 
    "token_uri": 
    "auth_provider_x509_cert_url": 
    "client_x509_cert_url": 
    }
module.exports = firebase;
````


## 22/10/22
### Primera base de datos
mi conexión con mysql estaba rotísima porque hace un tiempo desinstalé workbench, no se borró todo, y cuando lo instalé otra vez reventó por todos lados.\
para arreglarlo tuve que hacer:\
* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
* FLUSH PRIVILEGES;
(obviamente se puede poner otra contraseña, pero está hardcodeada en 16-DecimoSexta-clase/db/maria*)\
Una vez arreglado eso, de haber sido necesario\
* Backend> node .\16-DecimoSexta-clase\db\mariaCreateDb.js
* Backend> node .\16-DecimoSexta-clase\db\mariaCreateTable.js
* Backend> node .\16-DecimoSexta-clase\db\sqliteCreateTable.js
y por último
* Backend > npm run wswithdb

## 07/10/22
### Primera entrega del trabajo final
* npm run primeraentrega
  * ruta de productos: /api
    * metodos: GET /api, GET /api/id, POST /api, PUT /api/id, DELETE /api/id
    * autorizacion por header, usar "isadmin":true
  * ruta de carritos: /carrito
    * metodos: POST /carrito, DELETE /carrito/id, GET /carrito/id/productos, POST /carrito/id1/productos/id2, DELETE /carrito/id1/productos/id2

## 22/09/22
### Sexto desafio, decimosegunda clase
* websockets, chat y esos yuyos
  * npm run websockets

## 14/09/2022
### Quinto desafio, decima clase
* Motores de plantillas: pug, ejs, handlebars
  * npm run pug
  * npm run ejs
  * npm run handlebars
* ¿Cuál prefiero?
  * Handlebars, es el más parecido a django de los 3 y aún si no conociera este segundo, me parece la forma más práctica de implementar variables