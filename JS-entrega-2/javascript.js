//Clases

class Producto {
	constructor(nombre, precio){
	this.nombre = nombre;
	this.precio = precio;
}
}  

//Funciones
function opcionValida() {
	while(opcion < 0 || opcion > 4 || isNaN(opcion)) {
	alert('OPCIÓN INVÁLIDA');
	opcion = parseInt(prompt(opcionesMenu));
	}
	if(opcion === 0) {
	alert('GRACIAS POR UTILIZAR NUESTRO SISTEMA');
	return false;
	}
	return true;
}

function agregarProducto() {
	const nombre = prompt('Ingrese nombre del producto');
	const precio = parseFloat(prompt('Ingrese precio del producto'));
	const producto = new Producto(nombre.toUpperCase(), precio); //creamos el producto
	productos.push(producto); //lo agregamos a la lista
	alert('Producto agregado exitosamente');
}
function buscarIndiceDeProducto(nombreDeProducto) {
	let indice = -1;
	for(let i = 0; i < productos.length; i++) {
    const producto = productos[i];
		if(productos[i].nombre === nombreDeProducto.toUpperCase()){
		indice = i;
		break;
		}  
	}
	return indice;
}

function eliminarProducto() {
	let nombreProducto = prompt('Ingrese el nombre del producto a eliminar'); //obtengo el nombre del producto a eliminar
	let indiceProducto = buscarIndiceDeProducto(nombreProducto); //obtengo el índice del producto a eliminar

	while(indiceProducto === -1) {
		alert('EL PRODUCTO NO EXISTE');
		let nombreProducto = prompt('Ingrese el nombre del producto a eliminar'); //obtengo el nombre del producto a eliminar
		indiceProducto = buscarIndiceDeProducto(nombreProducto); //obtengo el índice del producto a eliminar
}
productos.splice(indiceProducto, 1); //elimino el producto
	alert('Producto eliminado');
	}

function verProductos() {
    let todosLosProductos = "" // aquí declaro que la variable funciona con string
    for(let i = 0; i < productos.length; i++) {
	todosLosProductos.concat(productos[i].nombre + ", ");
    alert('Los productos ingresados son: ' + todosLosProductos);
}
}


function calcularTotal() {
	let total = 0;
	//recorremos los productos
	for(let i = 0; i < productos.length; i++) {
		total = total + (productos[i].precio);
}
alert('El total es: $' + total);
}

//Inicio del programa

const opcionesMenu = '1- Agregar Producto, 2- Eliminar Producto, 3- Calcular Total, 4- Ver los productos, 0- Salir';
let opcion = parseInt(prompt(opcionesMenu));
let productos = [
	new Producto('Papa', 30),
	new Producto('Tomate', 50),
	new Producto('Lechuga', 25),
];

while(opcionValida(opcion)) {
	switch(opcion) {
		case 1: agregarProducto();
			break;
		case 2: eliminarProducto();
			break;
		case 3: calcularTotal();
			break;
    case 4: verProductos();
      break;

}
	opcion = parseInt(prompt(opcionesMenu));
}  