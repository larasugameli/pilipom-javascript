document.addEventListener("DOMContentLoaded", obtenerDatos);

function obtenerDatos() {
  const url = "data/datos.json";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => renderizarTienda(resultado));
}

//Definimos nuestras funciones a utilizar en la tienda
const renderizarTienda = (resultado) => {
  listaProductos.innerHTML = "";

  for (const producto of resultado) {
    //Creamos los elementos HTML
    const divProducto = document.createElement("div");
    const divExtra = document.createElement("div");
    const imgProducto = document.createElement("img");
    const nombreProducto = document.createElement("p");
    const precioProducto = document.createElement("p");
    const botonComprar = document.createElement("a");

    //Les agregamos los estilos asignandoles clases de css
    divProducto.className = "product";
    divExtra.className = "product__info";
    imgProducto.className = "product__img";
    nombreProducto.className = "product__name";
    precioProducto.className = "product__price";
    botonComprar.className = "button-primary button input";
    botonComprar.classList.add("agregar-carrito");

    //Le agregamos el contenido a los elementos creados y el id a los que vamos a necesitar despues
    imgProducto.src = producto.img;
    nombreProducto.append(producto.nombre);
    precioProducto.append(`$ ${producto.precio}`);
    botonComprar.append("Agregar al Carrito");
    botonComprar.setAttribute("data-id", producto.id);
    botonComprar.setAttribute("href", "#");
    divProducto.append(imgProducto, divExtra);
    divExtra.append(nombreProducto, precioProducto, botonComprar);
    listaProductos.append(divProducto);
  }
};

renderizarTienda(JSON.parse(localStorage.getItem("productos")));

//Listeners

cargarEventListeners();

function cargarEventListeners() {
  //Click en 'Agregar al Carrito' agregar el curso
  listaProductos.addEventListener("click", agregarProducto);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarProducto);

  //Muestras los cursos de Local Storage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Reseteamos el arregle
    limpiarHTML(); //Eliminamos todo el HTML
  });
}

//Functions
function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const ProductoSeleccionado = e.target.parentElement.parentElement;
    leerDatosProducto(ProductoSeleccionado);
  }
}
//Elimina el Producto del carrito
function eliminarProducto(e) {
  if (e.target.classList.contains("borrar-producto")) {
    const productoId = e.target.getAttribute("data-id");

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );

    carritoHTML(); //Volvemos a iterar sobre carrito y mostrar su HTML
  }
}

//Leer el contenido del HTML que se clickeo y busca info del curso
function leerDatosProducto(producto) {
  //Crear un objeto con el contenido del Producto actual
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector(".product__name").textContent,
    precio: producto.querySelector(".product__price").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );
  if (existe) {
    //Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; //Retorna el objeto actualizado
      } else {
        return producto; //Retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  //Agrega elementos al arreglo de carrito

  carritoHTML();
}

//Muestra el carrito de Compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();
  //Recorre el carrito y genera el HTML

  articulosCarrito.forEach((producto) => {
    const { imagen, titulo, precio, cantidad, id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>  <img src="${imagen}" Width="100"> </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td> <a href="#" class="borrar-producto" data-id="${id}"> X  </a>`;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

  //Agregar el carrito de compras al Storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Elimina los productos del body
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

//Total del carrito
/* let resultado = carrito.reduce((total, produto) => {
  return total + produto["precio"];
}, 0);

console.log(resultado);
 */
/* //Total del carrito
const total = articulosCarrito[precio].reduce(
  (accumulador, producto) => accumulador + producto.precio,
  0
);
contenedorCarrito.append(`Total Compra :  ${total}`);

console.log(total);


            function calcularTotal() {
              // Limpiamos precio anterior
              total = 0;
              // Recorremos el array del carrito
              for (let item of articulosCarrito) {
                // De cada elemento obtenemos su precio
                let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                  return itemBaseDatos["id"] == item;
                });
                total = total + miItem[0]["precio"];
              }
              // Formateamos el total para que solo tenga dos decimales
              let totalDosDecimales = total.toFixed(2);
              // Renderizamos el precio en el HTML
              $total.textContent = totalDosDecimales;
            } */
