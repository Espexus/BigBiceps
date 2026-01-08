(function () {

    // const alias = localStorage.getItem("alias");
    // const nacionalidad = localStorage.getItem("nacionalidad");
    // const bandera = localStorage.getItem("bandera");

    const grupos = ["brazos", "pecho o espalda", "abdomen", "pierna o gluteos", "cardiovascular", "deportivo"]
    

    const formulario = document.getElementById("formulario-registro-entreno")
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = new FormData(formulario);
        const grupoNum = parseInt(datos.get("grupo"));

        const grupo = grupos[grupoNum];
        const descripcion = datos.get("descripcion");

    const id = localStorage.getItem("idusuario");

        if (!grupo || !descripcion) {
            alert ("debes llenar todos los datos bro ")
            return
        }

        await registrar(descripcion, grupo, id)
    })

    async function registrar(descripcion, grupo, usuario) {
        let resultado;

        try {
            const res = await fetch("http://localhost:3000/api/registrarEntreno", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ descripcion, grupo, usuario })
            })
            if (!res.ok) {
                throw new Error ("error al ejecutar en el backend ")
            }
            resultado = await res.json();

            alert(resultado.message)
            
            
        } catch(err) {
            console.error("algo falló ", err)
            alert("intento fallido")
        }
    }
})()