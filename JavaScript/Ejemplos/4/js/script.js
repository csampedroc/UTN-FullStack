//setInterval(); Hace "algo" (funciòn) cada tanto tiempo
//setTimeOut(); Hace "algo" (funcion) despuès de transcurrido un tiempo
//los tiempos se calculan en milisegundos

var titulo = document.querySelector("h1");
var texto = document.querySelector("p");

var tbody = document.querySelector("tbody");

var imagen = document.querySelector("img");

var imagenes = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"];

var i=0;

setInterval(()=> {
    imagen.src = "image/"+imagenes[i];
    i = i + 1;

    if (i == 5) {
        i = 0;
    }
}, 1000)