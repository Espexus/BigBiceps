(function () {
    const formulario = document.getElementById("formularioLogin");
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = new FormData(formulario);
        await verificar(datos);
    })

    async function verificar (datos) {
        const alias = datos.get("alias");
        const clave = datos.get("clave");

        if(!alias || !clave) {
            alert("Debes llenar todos los datos");
            return;
        }
        await hacerLogin(alias, clave);
    }

    async function hacerLogin(alias, clave) {
        let resultado;

        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ alias, clave })
            })
            if (!res.ok) {
                throw new Error ("error al ejecutar en el backend ")
            }
            resultado = await res.json();
            
            
        } catch(err) {
            console.error("algo falló ", err)
            alert("datos inválidos o no tienes una cuenta todavía")
        }
        
        if (resultado.length > 0) {
            localStorage.setItem("idusuario", resultado[0].id);
            localStorage.setItem("alias", resultado[0].alias);
            localStorage.setItem("nacionalidad", resultado[0].nacionalidad);
            localStorage.setItem("bandera", resultado[0].bandera);
            window.location.href = "index.html";
        }
        

    }

})()