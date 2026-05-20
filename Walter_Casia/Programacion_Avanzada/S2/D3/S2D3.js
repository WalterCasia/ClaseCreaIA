/*console.log("Inicio sincronico")

function trabajoPesado(ms){
    const fin = Date.now() + ms;
    while(Date.now() < fin ){}
}

trabajoPesado(2000)
console.log("Despues del trabajo Pesado")
console.log("Fin sincronico")

// codigo Asincrono

console.log("Inicio asincrono");
setTimeout(() => {
    console.log("Temporizador listo (No bloqueo)")
}, 7000)

console.log("Se pueden seguir haciendo otras cosas")
console.log("Fin asincrono")

//Promesa

const tarea = new Promise((resolve, reject) => {
    let exito = true
    if (exito){
        resolve("Todo alio bien")
    } else {
        reject("Algo fallo")
    }
})

tarea.then(mensaje => console.log(mensaje))
     .catch(error => console.log(error));
*/

//promesa desde 0

function tareaAsincronica (ms) {
    return new Promise((resolve, reject) => {
        if (ms < 0){
            return reject (new Error("Tiempo invalido"))
        }
        setTimeout(() => resolve(`Listo en ${ms} ms`), ms)
    })
}

tareaAsincronica(5000)
    .then(mensaje => console.log("OK", mensaje))
    .catch(error => console.error("Fallo: ", error.message))
    .finally( () => console.log("Siempre me ejecuto"))


// async y await en javascript

