
var productos =  [

    {
        nombre: "harina",
        precio: 35
    },

    {
        nombre: "pan",
        precio: 25
    },

    {
        nombre: "papa",
        precio: 52
    },

    {
        nombre: "palta",
        precio: 55
    },    

    {
        nombre: "fideos",
        precio: 85
    },

    {
        nombre: "aceite",
        precio: 350
    },

    {
        nombre: "sopa",
        precio: 86
    },

    {
        nombre: "mermelada",
        precio: 108
    },

    {
        nombre: "porotos",
        precio: 69
    },

    {
        nombre: "lentejas",
        precio: 85
    },

    {
        nombre: "mandarina",
        precio: 43
    },

    {
        nombre: "banana",
        precio: 79
    },    

    {
        nombre: "leche de almendras",
        precio: 145
    },

    {
        nombre: "papel higienico",
        precio: 147
    },

    {
        nombre: "lavandina",
        precio: 55
    },

    {
        nombre: "alcohol en gel",
        precio: 123
    },    

    {
        nombre: "shampoo",
        precio: 400
    },
    {
        nombre: "salsa de tomate",
        precio: 35
    }

];

let carrito = [];

let tabla = document.getElementById("articulos");

function cargarProductos() {

    for(let i = 0; i < productos.length ; i++) {

        let fila = document.createElement("tr");
    
        let columnaNombre = document.createElement("td");
        let valorNombre = document.createTextNode(productos[i].nombre);
        
        columnaNombre.appendChild(valorNombre);
        
        let columnaPrecio = document.createElement("td");
        let valorPrecio = document.createTextNode(productos[i].precio);
        
        columnaPrecio.appendChild(valorPrecio);
        
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPrecio);
        fila.setAttribute('indice', i);
    
        fila.onclick=agregarProducto;    
            
        tabla.appendChild(fila);
    
    }
}

function agregarProducto() {
    carrito.push(this.getAttribute('indice'));
    carrito.forEach(element => {
        console.log(element);
        console.log(productos[element].nombre);
        console.log(productos[element].precio);
    });
}


cargarProductos();