class Elemento {
    constructor(id, model, brand, color, price) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.color = color;
        this.price = price;
    }
}

function eliminarElemento(nombreElemento) {
    let elementos = JSON.parse(localStorage.getItem('elementos'));
    console.log(elementos, nombreElemento);
    const elementoEncontrado = elementos.find(elemento => elemento.id === nombreElemento);

    if (elementoEncontrado) {
        elementos = elementos.filter(elemento => elemento.id !== nombreElemento);
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

function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status >= 400) reject(xhr.response);
      else resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject("Error en la llamada api!");
    };
    xhr.send(JSON.stringify(data));
  });
}

function iniciar() {
    sendHttpRequest("GET", "https://dummyjson.com/c/f972-101a-43ef-94dc")
    .then((responseData) => {
        const guitars = JSON.stringify(responseData.guitars);
        localStorage.setItem('elementos',  guitars)
    })
    .then(() => {
        const formulario = document.getElementById("formulario");
        const spanTotal = document.getElementById("total");
        formulario.addEventListener("submit", crearProducto);
        renderizarTotal();
        renderTable();
    });
}

function nombreProductoExiste(nombre) {
    const elementos = JSON.parse(localStorage.getItem('elementos'));
    return elementos.some( (el) => {
        return el.model.toLowerCase() === nombre.toLowerCase();
    });
}

function crearProducto(e) {
    e.preventDefault();

    const inputModel = document.getElementById("model");
    const inputBrand = document.getElementById("brand");
    const inputColor = document.getElementById("color");
    const inputPrice = document.getElementById("price");

    const modelName = inputModel.value;
    const brandName = inputBrand.value;
    const colorName = inputColor.value;
    const price = parseFloat(inputPrice.value);

    inputModel.value = "";
    inputBrand.value = "";
    inputColor.value = "";
    inputPrice.value = 0;

    if(nombreProductoExiste(modelName)) {
        alert("PRODUCTO YA EXISTE");
        return;
    }

    const producto = new Elemento(
        Math.random(),
        formatearNombre(modelName),
        brandName,
        colorName,
        price
    );

    const elementos = JSON.parse(localStorage.getItem('elementos'));
    elementos.push(producto);
    localStorage.setItem('elementos',  JSON.stringify(elementos));
    renderizarTotal();
    renderTable();
}

function renderizarTotal() {
    const elementos = JSON.parse(localStorage.getItem('elementos'))
    const total = elementos.reduce((suma, elemento) => suma + elemento.price, 0);
    localStorage.setItem('total',  total);
    const spanTotal = document.getElementById("total");
    spanTotal.innerText = total;
}


function renderTable() {
    var tbodyProductos = document.getElementById("tbodyProductos");

    tbodyProductos.innerHTML = "";
    const elementos = JSON.parse(localStorage.getItem('elementos'))
    for(const producto of elementos) {

        const tr = document.createElement("tr");
        const tdModel = document.createElement("td");
        const tdBrand = document.createElement("td");
        const tdColor = document.createElement("td");
        const tdPrice = document.createElement("td");

        const tdAcciones = document.createElement("td");

        tdModel.innerText = `${producto.model}`;
        tdBrand.innerText = `${producto.brand}`;
        tdColor.innerText = `${producto.color}`;


        const spanPrecio = document.createElement("span");
        spanPrecio.innerText = `$${producto.price}`;

        tdPrice.append(spanPrecio);

        const botonEliminar = document.createElement("button");
        botonEliminar.addEventListener('click', (e) => {
            const nombreProducto = producto.id;
            eliminarElemento(nombreProducto);

        })
        botonEliminar.innerText = "Eliminar";
        tdAcciones.append(botonEliminar);

        tr.append(tdModel, tdBrand, tdColor, tdPrice, tdAcciones);
        tbodyProductos.append(tr);
    }
}

iniciar();
console.log(moment());