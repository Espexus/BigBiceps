(function () {
    let idusuario = localStorage.getItem("idusuario")
    if(!idusuario) {
        console.error("No hay una sesión de usuario activa, vamos al login");
        window.location.href = "login.html";
    }

})()