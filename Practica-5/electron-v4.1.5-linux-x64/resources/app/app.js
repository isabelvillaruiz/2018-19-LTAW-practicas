const io = require('socket.io-client');
const socket = io('http://localhost:3000');

function main()
{
  console.log("Probando...")

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  //-- Variable contador para borrar si hay muchos
  var contador = 0

  //-- Funciona ahora con la tecla enter

  msg.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("send").click();
    }
  });

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value);

    //-- Limpio la Caja
    document.getElementById('msg').value = "";

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    display.innerHTML = display.innerHTML + msg + "<br>";
    contador = contador + 1;
    if (contador == 8){
      display.innerHTML = " " + msg + "<br>";
      contador = 0;
    }
  });

  //--Cuando se recibe un mensaje del admin








  //console.log("Estoy en app.js...")

  //-- Obtener los elementos del interfaz, del DOM
  //let button = document.getElementById('button')
  //let display = document.getElementById('display')

  //-- Cuando se aprieta el botón...
  //button.onclick = () => {

    //-- Sacar un mensaje en la consola
  //  console.log("click!")

    //-- Añadir la cadena al párrafo
  //  display.innerHTML += "holi "
  //}
}
