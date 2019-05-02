var products= 0;
var log = " ";

function add_to_cart(item){

    //Recarga del contador de la galería.
    document.getElementById(item.id).value = Number(document.getElementById(item.id).value) + 1;

    //Cookie ( a c t u a l i z a r )
    var cookie = document.cookie;

    products = products + 1;
    log = log + item.id + " ";

    document.cookie = "The products added are: " + log + " in total: " + products;

    console.log(item);
    console.log(document.cookie);


}
