async function obtenerUsuario(){
    try{
        console.log("Solicitando datos...")
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")

        if(!respuesta.ok)
            throw new Error('Error HTTP: ', respuesta.status)

        const usuarios = await respuesta.json()
        console.log("Usuarios recibidos: ", usuarios)
    }
    catch (error){
        console.error("Hubo un roblema con la solicitud: ", error.message)
    }
}

obtenerUsuario()


async function crearUsuario(){
    const nuevoUsuario = {
        name: "Walter Casia",
        email: "walterc@gmail.com"
    }

    try{
        const respuesta = await(fetch("https://jsonplaceholder.typicode.com/users"),{
            method: "POST",
            header: {
                "content-Type" : "application/json"
            },
            body: JSON.stringify(nuevoUsuario)
        });
        const data = await respuesta.json();
        console.log("Usuario creado: ", data)
    }
    catch(error){
        consle.error("Hubo un problema con al creacion")
    }
}

crearUsuario()


/// Otras formas de usar fetch
/// descargar texto

const res = await fetch("https://example.com/page.html")
const html = await res.text()
console.log(html)

///imagenes

//<img id ="imagen" width="300"/>

async function cargarImagen(){
    try{
        const rest = await fetch("")

        const blob = await res.blob();
        const urlTemporal = URL.createObjectURL(blob)

        document.getElementById("imagen").src = urlTemporal

        console.log("Las imagen esta cargada en memoria")
    }
    catch(error){
        console.error("Error al descargar: ", error)
    }
}

cargarImagen()