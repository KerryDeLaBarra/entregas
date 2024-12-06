class Elemento {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

function opcionValida() {
    while (opcion < 0 || opcion > 4 || isNaN(opcion)) {
        alert('OPCIÓN INVÁLIDA');
        opcion = parseInt(prompt(opcionesMenu));
    }
    if (opcion === 0) {
        alert('GRACIAS POR UTILIZAR NUESTRO SISTEMA');
        return false;
    }
    return true;
}

function formatearNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

function agregarElemento() {
    const nombre = prompt('Ingrese elemento para agregar');
    const precio = parseFloat(prompt('Ingrese precio del elemento'));
    if (!isNaN(precio)) {
        const elemento = new Elemento(formatearNombre(nombre), precio);
        elementos.push(elemento);
        alert('Elemento agregado exitosamente');
    } else {
        alert('Precio inválido. Inténtelo nuevamente');
    }
}

function eliminarElemento() {
    const nombreElemento = formatearNombre(prompt('Ingrese el nombre del elemento a eliminar'));
    const elementoEncontrado = elementos.find(elemento => elemento.nombre === nombreElemento);

    if (elementoEncontrado) {
        elementos = elementos.filter(elemento => elemento.nombre !== nombreElemento);
        alert(`Elemento eliminado exitosamente`);
    } else {
        alert('EL ELEMENTO NO EXISTE');
    }
}

function verElementos() {
    if (elementos.length > 0) {
        const listaElementos = elementos.map(elemento => elemento.nombre).join(', ');
        alert('Tu guitarra consiste de: ' + listaElementos);
    } else {
        alert('No hay elementos en tu guitarra');
    }
}

function calcularTotal() {
    const total = elementos.reduce((suma, elemento) => suma + elemento.precio, 0);
    alert('El total es: $' + total.toFixed(2));
}

// Inicio del programa
const opcionesMenu = 'ARMA TU GUITARRA CON ESTAS OPCIONES: 1- Agregar Elemento, 2- Eliminar Elemento, 3- Calcular Total, 4- Ver tu guitarra, 0- Salir';
let opcion = parseInt(prompt(opcionesMenu));
let elementos = [
    new Elemento(formatearNombre('Mástil de Rosewood'), 200),
    new Elemento(formatearNombre('Cuerpo de Telecaster'), 300),
    new Elemento(formatearNombre('Puente Evertune'), 500),
];

while (opcionValida(opcion)) {
    switch (opcion) {
        case 1:
            agregarElemento();
            break;
        case 2:
            eliminarElemento();
            break;
        case 3:
            calcularTotal();
            break;
        case 4:
            verElementos();
            break;
    }
    opcion = parseInt(prompt(opcionesMenu));
}