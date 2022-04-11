//Finalizar la compra
btnComprar.onclick = () => {
  Swal.fire({
    title: "Está seguro que desea realizar la compra?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#916c54",
    confirmButtonText: "SI",
    cancelButtonText: "NO",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Listo!",
        icon: "success",
        text: "Gracias por confiar en Pilipom",
        confirmButtonColor: "#C2C1C1",
      });
    } else {
      Swal.fire({
        title: "Listo",
        icon: "error",
        text: "Cancelamos la operación",
        confirmButtonColor: "#C2C1C1",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};

// Definir función y evitar definirla de manera anónima
const cuandoSeHaceClick = function (evento) {
  // Boton agregar al carrito
  Swal.fire({
    position: "top-end",
    icon: "success",
    text: "Se agrego el producto a tu carrito",
    showConfirmButton: false,
    timer: 1000,
    width: 500,
  });
};
// botones es un arreglo así que lo recorremos
btnAgregar.forEach((boton) => {
  //Agregar listener
  boton.addEventListener("click", cuandoSeHaceClick);
});
