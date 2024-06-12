// // busca en SessionStorage el usuario que esta Online
const usuario = JSON.parse(sessionStorage.getItem("usuarioOnline"));

const botonLogin = document.getElementById("boton-login")
const contenedorLogin = document.getElementById("contenedor-img-login")
const imagenLogin = document.getElementById("img-perfil")

// muestra u oculta el boton de Login
// si el usuario esta logueado muestra imagen de usuario
// si o lo esta muestra boton de login
if(usuario !== null){
    console.log("Usuario en linea : " + usuario.nombre)
    console.log(usuario.email)
    botonLogin.style.display = "none";
    contenedorLogin.style.display = "flex";
    imagenLogin.src = usuario.imagen;
}else{
    console.log("ningun usuario en linea");
}

// Escucha el boton de cerrar sesion
// busca el usuario con session == true y lo actualiza a false
// redirecciona a la pagina principal
function cerrarSesionFunc() {
    const cerrarSesion = document.getElementById("cerrar-sesion");
    const todosLosUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    cerrarSesion.addEventListener("click", () => {
        console.log("cerrar sesión");
        for (let i = 0; i < todosLosUsuarios.length; i++) {
            if (todosLosUsuarios[i].sesion) {
                todosLosUsuarios[i].sesion = false;
                localStorage.setItem("usuarios", JSON.stringify(todosLosUsuarios));
                console.log("estado de sesion al cerrar : " + todosLosUsuarios[i].sesion)
                sessionStorage.removeItem('usuarioOnline');
                // window.location.href = "/index.html";
                window.location.href = "https://facubrujo.github.io/CaC-proyecto/index.html";
                break;
            }
        }
    });
}
cerrarSesionFunc();