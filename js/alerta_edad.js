window.onload = function () {
    const session = sessionStorage.getItem('session'); // null, true o false
    console.log(`1 --- estado de la sesion = ${sessionStorage.getItem("session")}`);

    let esMayor = sessionStorage.getItem('esMayor'); // null, true o false
    console.log(`1 --- estado de esMayor = ${sessionStorage.getItem("esMayor")}`);

    venAlerta = document.querySelector(".alerta-edad-contenedor");
    venBloqueo = document.getElementById("bloqueo");
    const body = document.querySelector("body");

    body.style.overflow = "hidden";

    btnSi = document.getElementById("si");
    btnNo = document.getElementById("no");

    const cAlc = document.getElementById("cAlcohol");
    if (session !== null) {
        venAlerta.style.display = "none";
        venBloqueo.style.display = "none";
        body.style.removeProperty("overflow", true);
    } else {
        btnSi.addEventListener("click", function () {
            sessionStorage.setItem("session", true);
            console.log(`btn SI --- estado de la sesion ${sessionStorage.getItem("session")}`);
            esMayor = sessionStorage.setItem('esMayor', true);
            console.log("esMayor?? - " + sessionStorage.getItem("esMayor"));
            venAlerta.style.display = "none";
            venBloqueo.style.display = "none";
            cAlc.style.display = "block"
            
        });

        btnNo.addEventListener("click", function () {
            sessionStorage.setItem("session", true);
            console.log(`btn No --- estado de la sesion ${sessionStorage.getItem("session")}`);
            esMayor = sessionStorage.setItem('esMayor', false);
            console.log("esMayor?? - " + sessionStorage.getItem("esMayor"));
            venAlerta.style.display = "none";
            venBloqueo.style.display = "none";
            body.style.removeProperty("overflow", true);
            body.style.removeProperty("overflow", true);
            cAlc.style.display = "none";
        });
    };
};