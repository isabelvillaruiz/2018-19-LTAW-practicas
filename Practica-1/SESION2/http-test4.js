var http = require('http');

console.log("Arrancando servidor...")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("---> Peticion recibida")
  console.log("--> Cabecera de la solicitud: ")
  //-- Es un objeto. Esto imprimirá todas sus propiedades
  //console.log(req.headers)
  //console.log("HOST: " + req.headers.host)
  //console.log("USER AGENT: " + req.headers['user-agent'])
  console.log("Recurso solicitado (URL): " + req.url)
  //console.log(req.headers.host)
}).listen(8080);
