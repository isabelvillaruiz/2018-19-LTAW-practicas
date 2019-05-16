var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const express = require('express')

var users = 0;

//app.use(express.static('public'));


//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicituado")
});


//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  answer = '<br> NEW USER CONCCECTED! (ง^ᗜ^)ง" </br>'
  io.emit('new_message',answer);

  answer = '<br>  Welcome to the chat!! ٩( ᐛ )و " </br>'
  socket.emit('new_message',answer);

  users = users + 1;

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
    users = users -1;
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {

    console.log("msg", msg)
    if (msg == '/help') {

      console.log("Holi")

      answer = '<br> Esta es la lista de comandos que puedes ejcutar: </br>' +
        '<ul>'+
        '<li>/help</li>'+
        '<li>/list</li>'+
        '<li>/hello</li>'+
        '<li>/date</li>'+
        '</ul>'

      socket.emit('new_message', answer)

    }else if ( msg == '/list') {

      answer = '<br> El numero de usuarios es  (~‾▿‾)~ ' +   users + ': </br>'

      socket.emit('new_message', answer)

    }else if ( msg == '/hello' ){

      answer = '<br> Hi! Im the server (☞ﾟヮﾟ)☞  </br>'

      socket.emit('new_message', answer)

    }else if ( msg == '/date') {

      var date = new Date();
      answer = '<br> (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ ' +  date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() +  '</br>'
      socket.emit('new_message', answer)

    }else{
      //-- Notificarlo en la consola del servidor
      console.log("Mensaje recibido: " + msg)

      //-- Emitir un mensaje a todos los clientes conectados
      io.emit('new_message', msg);
    }
  })

});
