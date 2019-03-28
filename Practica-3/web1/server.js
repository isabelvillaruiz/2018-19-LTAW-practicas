var http = require('http');
var fs = require('fs');
var url = require('url');
var n = 1;
//var dt = require('./myfirstmodule');

console.log("Arrancando servidor...")

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var index = "./";
  console.log("filename: " + filename);

  if ( filename == index) {
    console.log("HE ENTRADO");
    fs.readFile("data1.html", function(err,data){
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
      console.log("Peticion atendida")
    });
  }else{
    fs.readFile(filename, function(err,data){
        console.log("data" + data);
        if (err) {
          console.log( "err" + err);
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write("The date and time are currently: " + dt.myDateTime() + "\n\n");
        //res.end('Hello Kaamoo!');
        res.write(data);
        return res.end();
        console.log("Peticion atendida")
    });
  }
}).listen(8080);
