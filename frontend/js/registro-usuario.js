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
        if (!await disponibilidad(alias)) {
            alert("alias no disponible, elige otro")
            return
        }
        let resultado;
        try {
            const res = await fetch ("http://localhost:3000/api/registroUsuario", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({alias, clave, edad, nacionalidad, bandera})
            })

            if (!res.ok) {
                throw new Error ("error al insertar los datos"); 
            }
            resultado = await res.json()
        } catch (err) {
            console.error("fallo algo ", err)
        }

        alert(resultado.message);
    }

    async function disponibilidad (alias) {
        let resultado;
        try {
            const res = await fetch (`http://localhost:3000/api/disponibilidad/${alias}`)
            if(!res.ok) {
                throw new Error ("error al consultar");
            }
            resultado = await res.json();

            if (resultado.total >= 1) {
                return false;
            }
            return true;

        } catch (err) {
            console.error("fallo algo ", err)
        }
    }

})()