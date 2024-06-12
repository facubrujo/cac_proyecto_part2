document.getElementById("formulario-busqueda").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const inputBusqueda = document.getElementById("input-busqueda").value;
    const ruta = document.getElementById("url");
    // const url = ruta;
    // console.log(url);
    if (inputBusqueda.trim() !== "") {
        if (ruta !== null) {
            window.location.href = `pages/busqueda_tragos.html?s=${inputBusqueda}`;
        } else {
            window.location.href = `busqueda_tragos.html?s=${inputBusqueda}`;
        }
    }
});

