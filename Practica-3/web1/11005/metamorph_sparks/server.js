var http = require('http');
var fs = require('fs');
var url = require('url');
var n = 1;

var Products_ddbb = ["amarillo", "naranja", "rosa", "rosa-Morado" , "verde-azul", "verde"];

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


function count_products(number, array) {

  var count = 0;
  for (var i = 0; i < array.length; i++) {
    var num_to_com = array[i].trim()
    //console.log(number + "vs" + num_to_com);
    if (number == num_to_com) {
      count = count + 1;
    }
  }

  return count;
}

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

         cookie_splitted_items = cookie.split(/[item]+/);

         console.log("Items: " + cookie_splitted_items);

         var Total_Products = cookie_splitted_items[cookie_splitted_items.length - 1].split("al:")[1];
         console.log(Total_Products);


         cookie_splitted_items.pop();

         yellow_markers = count_products("1",cookie_splitted_items);
         console.log("yellow_markers: " + yellow_markers);

         red_markers = count_products("2",cookie_splitted_items);
         console.log("red_markers: " + red_markers);

         pink_markers = count_products("3",cookie_splitted_items);
         console.log("pink_markers: " + pink_markers);

         violet_markers = count_products("4",cookie_splitted_items);
         console.log("violet_markers: " + violet_markers);

         blue_markers = count_products("5",cookie_splitted_items);
         console.log("blue_markers: " + blue_markers);

         green_markers = count_products("6",cookie_splitted_items);
         console.log("green_markers: " + green_markers);


         products_msg = "You bought: " + "<br><br>" +
                        + yellow_markers + " yellow_markers" + "<br><br>" +
                        + red_markers + " red_markers" + "<br><br>" +
                        + pink_markers + " pink_markers" + "<br><br>" +
                        + violet_markers + " violet_markers" + "<br><br>" +
                        + blue_markers + " blue_markers" + "<br><br>" +
                        + green_markers + " green_markers" + "<br><br>" +
                        " in total: " + Total_Products;


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
             content += products_msg;


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

  }else if ( filename == "./myquery") {

    console.log("He entrado al server");
    //-- Contenido en formato JSON
    //-- Es lo que se va a devolver en la petición
    // content = `
    // {
    // "productos": ["amarillo", "naranja", "rosa", "rosa-Morado" , "verde-Azul", "verde"]
    // }
    // `

    //-- Leer los parámetros recibidos en la peticion
    var letters_to_find = q.query;

    console.log(typeof(letters_to_find.param1));

    //-- Aqui voy a buscar en mi "array" que actua como base de datos, las letras que me envia la peticion client_ajax
    console.log("Parametros: " +letters_to_find.param1);


    var found =  [];

    for (i=0; i< Products_ddbb.length; i++){
        if (Products_ddbb[i].includes(letters_to_find.param1)){
            found.push(Products_ddbb[i]);
        }
    }

    console.log("Productos encontrados: " + found)

    //Convertimos el array en un formato JSON
    var content = JSON.stringify({items_found: found})

    //-- Generar el mensaje de respuesta
    //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
    //-- en la cabecera Content-Type
    res.setHeader('Content-Type', 'application/json')
    res.write(content);
    res.end();
    return


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
