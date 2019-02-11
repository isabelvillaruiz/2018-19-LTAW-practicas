var http = require('http');
var fs = require('fs');
var url = require('url');
var n = 1;

const mime = {

  'html' : 'text/html',
  'css' : 'text/css',
  'png' : 'image/png',
  'jpg' : 'image/jpg',
  'js' : 'text/javascript',
  'ico' : 'image/x-icon',
  '/' : 'text/html'
  }
//var dt = require('./myfirstmodule');

console.log("Arrancando servidor...")

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var index = "./";
  console.log("filename: " + filename);
  var ext = filename.split(".").slice(-1)[0];
  console.log("ext:" + ext);
  var mime_content = mime[ext];
  console.log("mime_content: " +  mime_content);


  if ( filename == index) {
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
