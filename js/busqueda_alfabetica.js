async function tragosPorLetraAlfabeto(letra) {
    try {
        const respuesta = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("error al obtener 'tragos por letra'", error);
    }
}

// ---- CREAR LISTA CON LETRAS PARA BUSQUEDA ----
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const arr = alfabeto.split("");
const ul = document.getElementById("buscador-alfabetico");
//console.log("ARREGLO : "+arr);
arr.forEach((dato) => {
    //console.log(dato);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("letra")
    li.textContent = "/"
    a.textContent = dato;
    ul.appendChild(li);
    li.appendChild(a);
});

// ---- FUNCION MANEJA LA BUSQUEDA ALFABETICA - DEVUELVE LETRA ----
function devolverLetra() {
    const letras = document.querySelectorAll(".letra");
    letras.forEach((enlace) => {
        enlace.addEventListener("click", async function () {
            mostrarCarga();
            //console.log("SI HIZO CLIC EN LA LETRA : " + enlace.textContent.toLocaleLowerCase());

            const datos = await tragosPorLetraAlfabeto(enlace.textContent.toLocaleLowerCase());
            // console.log("DATOS : " + datos)

            let datosFiltrados =[];
            esMayor = sessionStorage.getItem("esMayor");

            document.getElementById("tit-busqueda").textContent = `Resultados de busqueda : ${enlace}`;
            vistaElementosCuadricula(datos);
        });
    });
};

devolverLetra();