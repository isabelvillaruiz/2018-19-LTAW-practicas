var fs = require('fs');

console.log("mensaje numero 1:")

//-- Funcion llamada cuando se ha terminado de leer el fichero
function show_file(err, data) {
    console.log("--> Contenido del fichero")
    console.log(data)
    console.log("--> Final del fichero")
}
//-- Leer el fichero. Al terminar se invoca a la función show_file
fs.readFile('test.txt', 'utf8', show_file);
//console.log("Mensaje Final!") --Lanza este mensaje antes que la función.
