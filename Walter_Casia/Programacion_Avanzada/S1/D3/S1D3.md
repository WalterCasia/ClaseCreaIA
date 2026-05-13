## funcion normal 
```js
function saludar(nombre) {
    return "Hola " + nombre
}
```

## función flecha
ideales para los callback y funciones pequeñas
```js
const saludarFlecha = (nombre) => "Hola, " + nombre

```

# Qué es un callback?
Un **callback** es una **función** que se **pasa como argumento** a otra función para que ésta la **ejecute después** de realizar alguna operación.

```js
function modify(array, callback) {
    console.log('Modificando el array...');
    // hacemos algo
    array.push(4);
    // avisamos que ya se hizo algo
    callback();
}

const myArray = [1, 2, 3];

modify(myArray, function() {
    console.log('El array ha sido modificado:', myArray);
});
```

## Pasar datos al callback
```js
function modifyAndReport(array, callback) {
    console.log('Modificando el array...');
    array.push("Pérez");
    callback(array, array.length);
}

const apellido = ['García', 'López', 'Martínez'];

modifyAndReport(apellido, (modifiedArray, newLength) => {
    console.log('El array ha sido modificado:', modifiedArray);
    console.log('La nueva longitud del array es:', newLength);
} );
```

## Qué es un forEach?
forEach es un método de los arrays que sirve para recorrer todos sus elementos y ejecutar una función (callback) por cada uno, en orden.

Sintaxis:
```
array.forEach((elemento, indice, arreglo) => {
  // tu código aquí
}, thisArgOpcional);
```

- elemento: el valor actual edl array 
- indice: la posición (0, 1, 2, ... )
- arreglo: el mismo array que se está recorriendo 

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach( number => {
    console.log('Número:', number);
} );

const names = ['Alice', 'Bob', 'Charlie'];

names.forEach( (nombre, index, array) => {
    console.log(`Nombre: ${nombre}, Índice: ${index}, Array completo: ${array}, longitud del array: ${array.length}`);
}) 

const names = ['Alice', 'Bob', 'Charlie'];

names.forEach( (nombre, index) => {
    console.log(`Nombre: ${nombre}, Índice: ${index}`);
}) 


const data = [4 , 9, 16];
let suma = 0;

data.forEach( number => {
    suma += number;
})
console.log('Suma total:', suma);

```

## Diseñando nuestro propios callback
```js
function operar(num1, num2, callback) {
    return callback(num1, num2);
}

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;

console.log("suma: ", operar(10, 5, suma));
console.log("resta: ", operar(10, 5, resta));
console.log("multiplicación: ", operar(10, 5, multiplicacion));
console.log("división: ", operar(10, 5, division));

```

### Ejercicio
- Implemente `filtrarArreglo(arr, criterio)` que devuelva un **nuevo** arreglo con los elementos que cumplan `criterio(x)`.  
- Pruebe con criterios: `esPar`, `mayorQue(10)`, `multiploDe(3)`.

```js
function filtrarArreglo(arr, criterio) {
    let resultado = [];
    arr.forEach ( elemento => {
        if (criterio(elemento)) {
            resultado.push(elemento);
        }
    })
    return resultado;
}

const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const esPar = num => num % 2 === 0;
const mayorQue = num => num > 10;
const multiploDe = num => num % 3 === 0;

console.log("Números pares:", filtrarArreglo(datos, esPar));
console.log("Números mayores que 10:", filtrarArreglo(datos, mayorQue));
console.log("Múltiplos de 3:", filtrarArreglo(datos, multiploDe));
```

## Asincronía
- JS corre en un solo hilo
- JS usa un **event loop**

### setTimeout
```js
console.log("Inicio")
setTimeout( () => {
    console.log("Esto se muestra después de 2 segundos")
}, 2000);
console.log("Fin")

```

Ejercicio 2:

```js
function modifyAsync(array, callback) {
    console.log('1. Iniciando modificación asíncrona...');
    setTimeout( () => {
        array.push("Pérez");
        console.log('2. Modificación asíncrona completada.');
        callback(array, array.length);
    }, 2000);
}

const apellidos = ['García', 'López', 'Martínez'];
modifyAsync(apellidos, (modifiedArray, newLength) => {
    console.log('3. El array ha sido modificado:', modifiedArray);
    console.log('4. La nueva longitud del array es:', newLength);
} );

console.log("5. Fin del programa");
```


## Error first
```js
function cargarProductos(callback) {
  console.log("Cargando productos...");
  setTimeout(() => {
    const fallo = Math.random() < 0.3; // 30% de error simulado
    if (fallo) 
        return callback(new Error("Fallo en la red"), null);

    const productos = [
      { id: 1, nombre: "Mouse" },
      { id: 2, nombre: "Teclado" },
      { id: 3, nombre: "Monitor" },
    ];

    callback(null, productos);
  }, 1000);
}

cargarProductos( (err, items) => {
  if (err) 
    return console.log("Error:", err.message);

  console.log(`Llegaron ${items.length} productos:`);
  items.forEach( p => console.log("-", p.nombre));
});
```

## Ejercicio integrador

Ustedes han sido contratados para desarrollar el motor lógico de una biblioteca. El sistema debe ser capaz de buscar libros en una base de datos (simulando un retraso de red), filtrar los resultados según la disponibilidad y reportar cualquier error que ocurra durante la comunicación con el servidor.

### Requisitos:
- Base de Datos: Un arreglo de objetos llamado libros con las propiedades id, titulo y disponible (booleano).
- Función Asíncrona `obtenerLibrosServidor(callback):`
  - Debe usar setTimeout para simular una espera de 2 segundos.
  - Debe implementar el patrón Error-First.
  - Debe tener una probabilidad del 20% de fallar (simulando una caída de servidor).
- Función de Filtrado `filtrarDisponibles(lista, criterio):`
  - Debe utilizar el método `forEach` para recorrer los libros.
  - Debe devolver un nuevo arreglo solo con los libros que cumplan el `criterio`(callback).
- Ejecución Principal:
  - Llamar a la función asíncrona.
  - Si hay error, mostrarlo en consola.
  - Si tiene éxito, filtrar los libros disponibles y mostrar sus títulos uno por uno.
  