document.addEventListener('DOMContentLoaded', function () {
    // busca en la sesion si hay un usuario logueado
    const usuario = JSON.parse(sessionStorage.getItem("usuarioOnline"));
    const usuarioDatos = document.getElementById("perfil-usuario");
    const ul = document.getElementById("ul");
    const lista = document.getElementById("mi-lista");
    lista.style.display = "none";

    // muestra los datos del usuario a excepcion de la url de la imagen y la contraseña y array
    for (let clave in usuario) {
        const li = document.createElement('li');
        if (clave === "imagen" || clave === "password" || clave === "miLista" || clave === "sesion") {
            // li.style.display = "none";
            li.setAttribute("hidden", true);
        } else {
            li.textContent = `${clave}: ${usuario[clave]}`;
            ul.appendChild(li);
        }
    }

    usuarioDatos.appendChild(ul);

    // muestra la imagen del usuario en el perfil
    const img = document.getElementById("img");
    img.src = usuario.imagen;

    mostrarFavoritos(usuario.miLista);
});

async function tragosPorId(idTrago) {
    try {
        const respuesta = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idTrago}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("error al obtener 'trago por ID'", error);
    }
}
async function mostrarFavoritos(array) {
    const miList = document.getElementById("mis-favoritos");
    for (let i = 0; i < array.length; i++) {
        const data = await tragosPorId(array[i]);
        const trago = data.drinks[0];
        const div = document.createElement("div");
        div.classList.add("imagenes");


        const imgContenedor = document.createElement("div");
        imgContenedor.className = "imgFondo";

        const imgTarjeta = document.createElement("div");
        const calificacionForm = document.createElement("form");
        calificacionForm.id = "form";
        calificacionForm.className = "form";
        for (let i = 0; i < 5; i++) {
            const btn = document.createElement("button");
            btn.className = "btn-calificacion";
            btn.textContent = `⭐${""}`;
            btn.style.background = "none";
            calificacionForm.appendChild(btn);
        }

        const tituloTarjeta = document.createElement("h3");
        tituloTarjeta.textContent = trago.strDrink;
        tituloTarjeta.style.textAlign = "center";
        tituloTarjeta.style.color = "#fff";
        imgTarjeta.className = "tarjeta-imagen";

        //console.log(trago.strDrinkThumb);

        imgContenedor.style.backgroundImage = `url('${trago.strDrinkThumb}')`;

        imgTarjeta.appendChild(tituloTarjeta);
        imgTarjeta.appendChild(calificacionForm);
        imgContenedor.appendChild(imgTarjeta);
        div.appendChild(imgContenedor);

        const p = document.createElement("p");
        p.style.maxWidth = "15rem";
        p.textContent = trago.strDrink;
        div.appendChild(p);

        const id = document.createElement("p");
        id.textContent = trago.idDrink;
        id.className = "id-trago";
        id.hidden = true;
        div.appendChild(id);

        miList.appendChild(div);
    }
    imagenesClickeables();
}