(function () {

    window.addEventListener("DOMContentLoaded", async () => {
        let resultado;
        const id = parseInt(localStorage.getItem("idusuario"));

        try{
            const res = await fetch (`http://localhost:3000/api/entrenamientos/usuario/${id}`);

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
    const contenedorTotal = document.getElementById("total-entrenamientos")

    async function mostrar(resultado) {
        contenedor.textContent = "";
        
        const total = resultado.total;
        const datos = resultado.datos;

        contenedorTotal.textContent = `Tu total de entrenamientos es de: ${total}`;
        
        datos.forEach(registro => {
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