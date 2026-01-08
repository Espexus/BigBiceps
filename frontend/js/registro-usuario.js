(function() {
    const formulario = document.getElementById("formularioRegistro");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = new FormData(formulario);

        await verificarDatos(datos);
    })

    const nacionalidades = ["Argentina", "Perú", "Colombia", "México", "Venezuela"];
    const banderas = ["imgs/argentina.png", "imgs/peru.png", "imgs/colombia.jpg", "imgs/mexico.png", "imgs/venezuela.png"]
    
    async function verificarDatos(datos) {
        const nacionalidadValue = parseInt(datos.get("nacionalidad"));

        const alias = datos.get("alias");
        const clave = datos.get("clave");
        const edad = parseInt(datos.get("edad"));
        const nacionalidad = nacionalidades[nacionalidadValue];
        const bandera = banderas[nacionalidadValue];

        console.log(alias, clave, edad, nacionalidad, bandera);

        if(!alias || !clave || isNaN(edad) || isNaN(nacionalidadValue)) {
            alert("Debes llenar todos los datos para poder registrarte o intentas mandar datos erróneos");
            return
        }

        await registrar(alias, clave, edad, nacionalidad, bandera);

    }

    async function registrar (alias, clave, edad, nacionalidad, bandera) {
        let resultado;
        try {
            const res = await fetch ()
        } catch (err) {
            
        }
    }

})()