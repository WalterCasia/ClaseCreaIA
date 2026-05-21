// simulacion de pedido de cafe

function tiempoCafe (ms){
    return new Promise ((resolve, reject) =>{
        if (ms <= 0) {
            return reject(new Error("Tiempo invalido"))
        }
        setTimeout(() => resolve (`Se ha completado el tiempo ${ms}, para prepara un cafe`), ms)
    })
}
/*
tiempoCafe(3000)
    .then(msg => console.log(msg))
    .catch(err => console.error(err.message))
    .finally(() => console.log("Se cierra pedido "))
*/


function prepararPastel (tipoPastel) {
    return new Promise((resolve, reject) =>{
        if (tipoPastel === "Fresa"){
            ms = 5000
        }else if(tipoPastel === "chocolate"){
            ms = 6000
        }else{
            ms = 0
        }
        
        if (ms <= 0) {
            return reject(new Error("Pastel no existe"))

        }

        setTimeout(() => resolve(`Se ha preparada el pastel sabor ${tipoPastel} en ${ms} ms`), ms)
    })
}

async function atenderCliente(){
    console.log("Se recibe pedido:");
    const pedidoPastel =  prepararPastel("Fresa");
    const pedidoPastel1 =  prepararPastel("chocolate");
    const pedidocafe = tiempoCafe(-8)

const [pedido, pedido1, pedido2] = await Promise.allSettled([pedidoPastel, pedidoPastel1, pedidocafe])
console.log(pedidoPastel)
console.log(pedidoPastel1)
console.log(pedidocafe)
}
atenderCliente();

/*
    const pedidoPastel2 = await prepararPastel("vainilla");
    console.log(pedidoPastel2);
    console.log("Pedido ya entregado")
}





function tarea(ms, nombre) {
    return new Promise( res => {
        setTimeout( () => res(`${nombre} lista en ${ms} ms`), ms )
    } )
}
async function ejemploAll() {
    const promesa1 = tarea(5000, "Lavar");
    const promesa2 = tarea(3000, "Cocinar");
    const promesa3 = tarea(6000, "Limpiar");
    const promesa4 = tarea(2000, "Aplanchar");
const [prom1, prom2, prom3, prom4] = await Promise.all([promesa1, promesa2,
promesa3, promesa4])
console.log(promesa1)
console.log(promesa2)
console.log(promesa3)
console.log(promesa4)

}

ejemploAll()
*/


// EJERCICIO

function cafetera (ms){
    return new Promise ((resolve, reject) =>{
        if (ms <= 0) {
            return reject(new Error("Tiempo invalido"))
        }
        setTimeout(() => resolve (`Se ha completado el tiempo ${ms}, para prepara un cafe`), ms)
    })
}