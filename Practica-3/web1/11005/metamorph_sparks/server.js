var http = require('http');
var fs = require('fs');
var url = require('url');
var n = 1;

const mime = {

  'html' : 'text/html',
  'css' : 'text/css',
  'png' : 'image/png',
  'jpg' : 'image/jpg',
  'jpeg' : 'image/jpeg',
  'js' : 'text/javascript',
  'ico' : 'image/x-icon',
  '/' : 'text/html',
  'mp4' : 'video/mp4'
  }
//var dt = require('./myfirstmodule');

console.log("Arrancando servidor...")

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var index = "./";
  console.log("filename:" + filename);
  var ext = filename.split(".").slice(-1)[0];
  console.log("ext:" + ext);
  var mime_content = mime[ext];
  console.log("mime_content: " +  mime_content);


  //-- Leer las cookies
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  if ( filename == "./login"){
      console.log("He entrado al loooogin");

      //-- ESTABLECER LA COOKIE!!
      res.setHeader('Set-Cookie', 'user=Isabel')

      console.log("Isabel registrada!");


    fs.readFile("index.html", function(err,data){
      // if (err) {
      //   console.log( "err" + err);
      //   res.writeHead(404, {'Content-Type': 'text/html'});
      //   return res.end("404 Not Found");
      // }
      res.writeHead(200, {'Content-Type': 'text/html'});
      //res.write("The date and time are currently: " + dt.myDateTime() + "\n\n");
      //res.end('Hello Kaamoo!');
      res.write(data);
      return res.end();



      });

  //-- Se intenta acceder a un recurso que no existe
  //-- Pagina de acceso
}else if ( filename == "./myform" ) {
    console.log("HOLA CARACOLA______________________________________________");

       if (req.method === 'POST') {
         // Handle post info...


         //Comienzo de tratar los datos de la cookies
         cookie_splitted = cookie.split(/[=;\s]+/);
         console.log("COOKIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEES:");
         console.log(cookie_splitted);

         cookie_splitted_items = cookie.split(/[item]+/);

         cookie_splitted_items.pop();
         console.log("ITEMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
         console.log(cookie_splitted_items);

         cookie_splitted_items_string = cookie_splitted_items.join(",");
         console.log("El string definitivo" + cookie_splitted_items_string);

         n_amarillo = cookie_splitted_items_string.search(/d[1]/);
         console.log("amarillos(1) : " + n_amarillo);




         //Final de tratar los datos de la cookie.


         var content = `
         <!DOCTYPE html>
         <html lang="es">
         <link href="styles.css" rel="stylesheet" type="text/css" />
           <head>
             <meta charset="utf-8">
             <title>FORM 1</title>
           </head>
           <body>
             <h4>Recibido: `

         req.on('data', chunk => {
             //-- Leer los datos (convertir el buffer a cadena)
             data = chunk.toString();
             console.log("Dataaaaaaaaaaaaaaaaaaa: " + data);


             //Vamos a desglosar el resultado del formulario.
             data_splitted = data.split(/[=&+]+/);
             console.log("data_splitted:________" + data_splitted);

             var email_crash = data_splitted[5].includes("%40");


             if (email_crash) {
               email = data_splitted[5].replace("%40","@");
             } else {
               email = data_splitted[5];
             }

             pay_method = data_splitted[7].replace("_"," ");

             msg = "Mr/Mrs " + data_splitted[1] + " " + data_splitted[3] +
                    " thank'u for choosing Tombow Shop. You choose " +
                    pay_method + " to pay the order." +
                    "We are going to send u a e-mail to " + email
                    + " with your bill."

             //-- Añadir los datos a la respuesta
             content += msg;


            //-- Fin del mensaje. Enlace al formulario
            content += `
                </h4>
                <a href="/">[PáginaPrincipal]</a>
              </body>
            </html>
            `
             //-- Mostrar los datos en la consola del servidor
             console.log("Datos recibidos: " + msg)
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

  }else if ( filename == index) {
    fs.readFile("index.html", function(err,data){
      // if (err) {
      //   console.log( "err" + err);
      //   res.writeHead(404, {'Content-Type': 'text/html'});
      //   return res.end("404 Not Found");
      // }
      res.writeHead(200, {'Content-Type': mime_content});
      //res.write("The date and time are currently: " + dt.myDateTime() + "\n\n");
      //res.end('Hello Kaamoo!');
      res.write(data);
      return res.end();
      console.log("Peticion atendida")
    });

  }else{
    fs.readFile(filename, function(err,data){
      if (err) {
        console.log( "err" + err);
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': mime_content});
      //res.write("The date and time are currently: " + dt.myDateTime() + "\n\n");
      //res.end('Hello Kaamoo!');
      res.write(data);
      return res.end();
      console.log("Peticion atendida")
    });
  }
}).listen(8080);
