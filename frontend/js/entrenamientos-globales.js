(function () {

    window.addEventListener("DOMContentLoaded", async () => {
        let resultado;

        try{
            const res = await fetch ("http://localhost:3000/api/entrenamientos");

            if(!res.ok) {
                throw new Error ("error en la consulta")
            }
            resultado = await res.json();
            await mostrar(resultado)

        } catch (err) {
            console.log("algo salió mal con la consulta ", err)
        }
    })

    const contenedor = document.getElementById("lista-entrenamientos")

    async function mostrar(resultado) {
        contenedor.textContent = "";
        resultado.forEach(registro => {
            const alias = registro.alias;
            const bandera = registro.bandera;
            const grupo = registro.grupo;
            const descripcion = registro.descripcion;

            

            const contenido = `
                <div class="encabezado-publicacion">
                    <p class="alias-publicacion">${alias}</p>
                    <img src="${bandera}" class="bandera-publicacion">
                </div>
                <div class="cuerpo-publicacion">
                    <h3 class="subtitulo-publicacion">${grupo}</h3>
                    <p class="descripcion-publicacion">${descripcion}</p>
                </div>
            `
            const publicacion = document.createElement("div");
            publicacion.classList.add("publicacion");
            publicacion.innerHTML = contenido

            contenedor.appendChild(publicacion);

        });
    }

})()