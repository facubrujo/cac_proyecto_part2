document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formulario");
    const alerta = document.getElementById("carga-correcta");

    alerta.style.display = "none";

    /* molde de usuario nuevo*/
    let usuarioNuevo = {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        mayorEdad: "",
        genero: "",
        imagen: "../img/usuario_icono.png",
        miLista: [],
        sesion: false
    };

    // var submitControl = {
    //     nombre: false,
    //     apellido: false,
    //     email: false,
    //     password: false,
    //     passrord2: false,
    //     mayorEdad: false,
    //     genero: false
    // };

    // objetos validaciones y mensajes de error
    const validaciones = {
        nombre: /^[a-zA-Z]+$/,
        apellido: /^[a-zA-Z]+$/,
        email: /^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        password1: /^(?=.*[A-Z])(?=.*[^\s]).{8,}$/ //  /^\S+$/
    };

    const mensajesError = {
        nombre: "El nombre debe contener solo letras y sin espacios.",
        apellido: "El apellido debe contener solo letras y sin espacios.",
        email: "El email debe tener un formato valido (email@email.com).",
        password1: "La contraseña debe ser de 8 o mas caracteres, no debe contener espacios y debe tener al menos una mayuscula",
        password2: "Las contraseñas deben coincidir.",
        esMayor: "Debe seleccionar una opción.",
        genero: "Debe seleccionar una opción."
    };

    //console.clear();
    // control nombre 
    const nombre = document.getElementById("nombre").addEventListener("input", function () {
        const error = document.getElementById("nombre-error");
        if (validaciones.nombre.test(this.value)) {
            error.className = "error-ok";
            error.textContent = "OK";
           // submitControl.nombre = true;
            usuarioNuevo.nombre = this.value;
            //console.log("usuario nombre : "+ usuarioNuevo.nombre)
        } else {
            error.className = "error";
            error.textContent = mensajesError.nombre;
            //submitControl.nombre = false;
        }
    });

    // control apellido
    const apellido = document.getElementById("apellido").addEventListener("input", function () {
        const error = document.getElementById("apellido-error");
        if (validaciones.apellido.test(this.value)) {
            error.className = "error-ok";
            error.textContent = "OK";
            //submitControl.apellido = true;
            usuarioNuevo.apellido = this.value;
        } else {
            error.className = "error";
            error.textContent = mensajesError.apellido;
            //submitControl.apellido = false;
        }
    });

    // control email
    const email = document.getElementById("email").addEventListener("input", function () {
        const error = document.getElementById("email-error");
        console.log("desde input : "+this.value);
        let existe = existeUsuario(this.value);

        console.log("existe : "+existe);
        if (validaciones.email.test(this.value) && !existe) {
            error.className = "error-ok";
            error.textContent = "OK";
            //submitControl.email = true;
            usuarioNuevo.email = this.value;
        } else if (validaciones.email.test(this.value) && existe !== null) {
            error.textContent = `ya existe un usuario con email : ${this.value}`;
            error.className = "error";
        } else {
            error.className = "error";
            error.textContent = mensajesError.email;
            //submitControl.email = false;
        }
    });

    // control contraseña 1
    const password1 = document.getElementById("password1").addEventListener("input", function () {
        const error = document.getElementById("password1-error");
        if (validaciones.password1.test(this.value)) {
            error.className = "error-ok";
            error.textContent = "OK";
            //submitControl.password = true;
            usuarioNuevo.password = this.value;
        } else {
            error.className = "error";
            error.textContent = mensajesError.password1;
            //submitControl.password = false;
        }
    });

    // control contraseña 2
    const password2 = document.getElementById("password2").addEventListener("input", function () {
        var pass1 = document.getElementById("password1").value;
        const error = document.getElementById("password2-error");
        if (pass1 === this.value.toString()) {
            error.className = "error-ok";
            error.textContent = "OK";
            //submitControl.passrord2 = true;
        } else {
            error.className = "error";
            error.textContent = mensajesError.password2;
            //submitControl.passrord2 = false;
        }
    });

    // control campo select edad
    const mayorEdad = document.getElementById("esMayor").addEventListener("input", function () {
        console.log(this.value);
        const error = document.getElementById("esMayor-error");
        if (this.value === "si" || this.value === "no") {
            console.log("ok");
            error.className = "error-ok";
            error.textContent = "OK";
            //submitControl.mayorEdad = true;
            usuarioNuevo.mayorEdad = this.value;
        } else {
            console.log("error");
            error.className = "error";
            error.textContent = mensajesError.esMayor;
            //submitControl.mayorEdad = false;
        }
    });

    // control campo select radio genero
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', () => {
            const error = document.getElementById("genero-error");
            if (input.checked) {
                error.className = "error-ok"
                error.textContent = "OK";
                //submitControl.genero = true;
                usuarioNuevo.genero = input.value;
            } else {
                error.className = "error";
                error.textContent = mensajesError.genero;
                //submitControl.genero = false;
            }
        });
    });

    // carga y muestra de imagen
    let imagenUrl = "../img/usuario_icono.png";
    document.querySelector('#archivo').addEventListener('change', function (event) {
        const imagenInput = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imagenUrl = e.target.result;

            usuarioNuevo.imagen = imagenUrl;

            const imagenMuestra = document.getElementById('imagen-muestra');
            imagenMuestra.src = e.target.result;
            document.getElementById('contenedor-de-imagen').style.display = 'block';
            //console.log(e.target.result);
        }
        reader.readAsDataURL(imagenInput);
    });

    // Control evento submit
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        for (let clave in usuarioNuevo) {
            console.log(`${clave} : ${usuarioNuevo[clave]}`)
        }

        console.log("nuevo objeto usuario creado : " + usuarioNuevo);
        //alert();

        if (localStorage.getItem("usuarios") === null) {
            console.log("Array usuarios no existe, creando array");
            const usuarios = [];

            console.log("agregando usuario nuevo a la lista/array");
            usuarios.push(usuarioNuevo);
            console.log("Array de objetos usuario : " + usuarios);

            const guardarUsu = JSON.stringify(usuarios)
            localStorage.setItem("usuarios", guardarUsu);
        } else {
            console.log("Array de objetos existe, buscando en Storage");
            const usuarios = JSON.parse(localStorage.getItem("usuarios"));
            console.log("Array recuperado, usuarios : " + usuarios);
            console.log("agregando nuevo usuario a la lista");
            usuarios.push(usuarioNuevo);
            console.log("usuario agregado : " + usuarios);

            const guardarUsu = JSON.stringify(usuarios)
            localStorage.setItem("usuarios", guardarUsu);
        }

        formulario.style.display = "none";
        const usuNombre = document.getElementById("usuario-nombre");
        usuNombre.innerHTML = `"${usuarioNuevo.nombre}", `;
        alerta.style.display = "block";
        alerta.style.backgroundColor = "#00800078";
    });
});

// metodo verificar direccion de usuario
function existeUsuario(usuarioEmail) {
    let todosUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (todosUsuarios === null) {
        return false;
    } else {
        for(let clave in todosUsuarios){
            if(todosUsuarios[clave].email === usuarioEmail){
                return true;
            }
        }
        return false;
    }
}