(function() {

    window.addEventListener("DOMContentLoaded", async ()=> {
        const id = localStorage.getItem("idusuario");
        let resultado;

        try {
            let res = await fetch(`http://localhost:3000/api/datosUser/${id}`)
            if (!res.ok) {
                throw new Error ("error al consultar los datos ")
            }
            resultado = await res.json();
            await mostrarDatos(resultado);

        } catch (err) {
            console.error("error en la consulta ", err)
        }
    })

    const aliasEspacio = document.getElementById("alias-espacio");
    const edadEspacio = document.getElementById("edad-espacio");
    const nacionalidadEspacio = document.getElementById("nacionalidad-espacio");
    const banderaEspacio = document.getElementById("bandera-espacio");

    async function mostrarDatos(resultado) {
        const alias = resultado.alias;
        const edad = resultado.edad;
        const nacionalidad = resultado.nacionalidad;
        const bandera = resultado.bandera;

        aliasEspacio.textContent = alias;
        edadEspacio.textContent = edad;
        nacionalidadEspacio.textContent = nacionalidad;

        banderaEspacio.src = bandera;

        await llenarFormulario(alias, edad, nacionalidad)
    }
    const paises = ["Argentina", "Perú", "Colombia", "México", "Venezuela"];
    const banderas = ["imgs/argentina.png", "imgs/peru.png", "imgs/colombia.png", "imgs/mexico.png", "imgs/venezuela.png"]

    async function llenarFormulario (alias, edad, nacionalidad) {
        const aliasForm = document.getElementById("alias");
        const edadForm = document.getElementById("edad");
        const nacionalidadForm = document.getElementById("nacionalidad");

        aliasForm.value = alias;
        edadForm.value = edad;


        let indice = paises.indexOf(nacionalidad);
        console.log(indice)
        nacionalidadForm.value = indice;
    }

    // ahora la parte de la actualización de los datos en la bd //

    const botonActualizar = document.getElementById("actualizacion");
    const formularioActualizar = document.getElementById("formulario");
    formularioActualizar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = new FormData (formularioActualizar);
        const nacionalidadNum = parseInt(datos.get("nacionalidad"));

        const alias = datos.get("alias");
        const edad = parseInt(datos.get("edad"));
        const clave = datos.get("clave");
        const nacionalidad = paises[nacionalidadNum];

        const bandera = banderas[nacionalidadNum];

        if(!alias || !edad || !clave || !nacionalidad) {
            alert("llena todos los datos para continuar");
            return;
        }

        await actualizar(alias, edad, clave, nacionalidad, bandera)
    })

    async function actualizar (alias, edad, clave, nacionalidad, bandera) {
        const idusuario = parseInt(localStorage.getItem("idusuario"));
        let resultado;
        console.log(idusuario, alias, edad, nacionalidad, clave, bandera)
        try {
            console.log("hola")
            let res = await fetch("http://localhost:3000/api/datosUser/update/", {
                method: "PUT",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ idusuario, alias, edad, nacionalidad, clave, bandera })
            })
            
            if(!res.ok) {
                throw new Error("error en la consulta");
            }
            resultado = await res.json();
            alert(resultado.message)
            window.location.reload();


        } catch (err) {
            console.error("error al hacer la consulta ", err)
            alert("no se pudo actualizar");
        }

        
    }

    botonActualizar.addEventListener("click", () => {
        formularioActualizar.classList.remove("oculto");
    })



})()