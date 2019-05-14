function redirect(){

var product_redirect = document.getElementById("resultado").value;



}

  //-- Cuando el usuario escribe
function buscar(event){


  var total_box = document.getElementById("buscador").value;

  console.log("Quiero nachos y " + total_box  )

  if (total_box.length >= 3) {
    console.log("SOMOS 3 QUE JUBILO ALEGRIA" + total_box);


      //-- Crear objeto para hacer peticiones AJAX
      m = new XMLHttpRequest();

      //-- Configurar la petición
      m.open("GET","http://localhost:8080/myquery?param1=" + total_box, true);

      //-- Configurar la petición
      //--m.open("GET","http://localhost:8080/myquery?param1=hola&param2=wei", true);


      //-- Cuando la haya alguna noticia sobre la peticion
      //-- ejecuta este código
      m.onreadystatechange=function(){
      //-- Petición enviada y recibida. Todo OK!
        if (m.readyState==4 && m.status==200){

          //-- La respuesta es un objeto JSON
          var o = JSON.parse(m.responseText)

          console.log("Json: " + o)

          //-- Borrar el resultado anterior que hubiese en el párrafo
          //-- de resultado
          resultado.innerHTML = "";

          //--Recorrer los productos del objeto JSON
          for (i=0; i < o.items_found.length; i++) {

            //-- Añadir cada producto al párrafo de visualización
            resultado.innerHTML += o.items_found[i];

            //-- Separamos los productos por ',''
            if (i<o.items_found.length-1) {
              resultado.innerHTML += ', ';
            }
          }
        }
      }

       //-- Enviar la petición!
       m.send();

  }

}
