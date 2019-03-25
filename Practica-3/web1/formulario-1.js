var http = require('http');
var url = require('url');

const PORT = 8080

console.log("Arrancando servidor en puerto " + PORT)

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {

  //-- Mostrar en la consola el recurso al que se accede
  var q = url.parse(req.url, true);
  console.log("Petición: " + q.pathname)

  //-- Segun el recurso al que se accede
  switch (q.pathname) {

    //-- Pagina principal
    case "/":
      content = "Bienvenido a mi tienda "

      content = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8">
            <title>FORM 1</title>
          </head>
          <body>
            <form action="/myform" method="post">
              Nombre:
              <input type="text" name="Nombre"/> <br />
              <input type="submit"/>
            </form>
          </body>
        </html>
      `

      res.statusCode = 200;
      break;

    //-- Pagina de acceso
    //--Cuando el usuario ha rellenado la entrada de texto y pulsado en el botón de envío, se invoca el recurso /myform.
    //--En el código se comprueba primero que se ha recibido una solicitud de tipo POST:
    case "/myform":

      if (req.method === 'POST') {
        // Handle post info...

        var content = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8">
            <title>FORM 1</title>
          </head>
          <body>
            <p>Recibido: `


            //--En la variable content se sitúa la primera parte del HTML de respuesta a enviar.
            //--Para leer la información recibida en el cuerpo, se usa este código:
            
        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();

            //-- Añadir los datos a la respuesta
            content += data;

            //-- Fin del mensaje. Enlace al formulario
            content += `
                </p>
                <a href="/">[Formulario]</a>
              </body>
            </html>
            `
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            res.statusCode = 200;
         });

         req.on('end', ()=> {
           //-- Generar el mensaje de respuesta
           res.setHeader('Content-Type', 'text/html')
           res.write(content);
           res.end();
         })
         return
      }

      break

    //-- Se intenta acceder a un recurso que no existe
    default:
      content = "Error";
      res.statusCode = 404;
  }

  //-- Generar el mensaje de respuesta
  res.setHeader('Content-Type', 'text/html')
  res.write(content);
  res.end();

}).listen(PORT);
