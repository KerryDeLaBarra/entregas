class Elemento {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

function eliminarElemento(nombreElemento) {
    let elementos = JSON.parse(localStorage.getItem('elementos'));
    const elementoEncontrado = elementos.find(elemento => elemento.nombre === nombreElemento);

    if (elementoEncontrado) {
        elementos = elementos.filter(elemento => elemento.nombre !== nombreElemento);
        localStorage.setItem('elementos',  JSON.stringify(elementos));
    } else {
        alert('EL ELEMENTO NO EXISTE');
    }
    renderTable();
    renderizarTotal();
}

function formatearNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

function iniciar() {
    let elementos = [
        new Elemento(formatearNombre('Mástil de Rosewood'), 200),
        new Elemento(formatearNombre('Cuerpo de Telecaster'), 300),
        new Elemento(formatearNombre('Puente Evertune'), 500),
    ];
    localStorage.setItem('elementos',  JSON.stringify(elementos));
    const formulario = document.getElementById("formulario");
    const spanTotal = document.getElementById("total");

    formulario.addEventListener("submit", crearProducto);
    renderizarTotal();
    renderTable();

}


function nombreProductoExiste(nombre) {
    const elementos = JSON.parse(localStorage.getItem('elementos'));
    return elementos.some( (el) => {
        return el.nombre.toLowerCase() === nombre.toLowerCase();
    });
}

function crearProducto(e) {
    e.preventDefault();

    const inputNombreProducto = document.getElementById("nombreProducto");
    const inputPrecioProducto = document.getElementById("precioProducto");

    const nombreProducto = inputNombreProducto.value;
    const precioProducto = parseFloat(inputPrecioProducto.value);

    inputNombreProducto.value = "";
    inputPrecioProducto.value = "";

    if(nombreProductoExiste(nombreProducto)) {
        alert("PRODUCTO YA EXISTE");
        return;
    }

    const producto = new Elemento(
       formatearNombre(nombreProducto),
        precioProducto
    );

    const elementos = JSON.parse(localStorage.getItem('elementos'));
    elementos.push(producto);
    localStorage.setItem('elementos',  JSON.stringify(elementos));
    renderizarTotal();
    renderTable();
}

function renderizarTotal() {
    const elementos = JSON.parse(localStorage.getItem('elementos'));
    const total = elementos.reduce((suma, elemento) => suma + elemento.precio, 0);
    localStorage.setItem('total',  total);
    const spanTotal = document.getElementById("total");
    spanTotal.innerText = total;
}


function renderTable() {
    var tbodyProductos = document.getElementById("tbodyProductos");

    tbodyProductos.innerHTML = "";
    const elementos = JSON.parse(localStorage.getItem('elementos'));
    for(const producto of elementos) {

        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        const tdPrecio = document.createElement("td");
        const tdAcciones = document.createElement("td");

        tdNombre.innerText = `${producto.nombre}`;

        const spanPrecio = document.createElement("span");
        spanPrecio.innerText = `$${producto.precio}`;

        tdPrecio.append(spanPrecio);

        const botonEliminar = document.createElement("button");
        botonEliminar.addEventListener('click', (e) => {
            const nombreProducto = `${producto.nombre}`;
            eliminarElemento(nombreProducto);

        })
        botonEliminar.innerText = "Eliminar";
        tdAcciones.append(botonEliminar);

        tr.append(tdNombre, tdPrecio, tdAcciones);
        tbodyProductos.append(tr);
    }
}

iniciar();