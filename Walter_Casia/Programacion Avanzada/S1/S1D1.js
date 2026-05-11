/*
console.log('Hola mundo');

let edad = 30
edad = 40 // valido por que usamos 'let' el cual permite el cambio
console.log(edad)

const impuesto = 0.13;
//impuesto = 0.15;

const curso = "Programcion avanzada";
let inscritos = 15;
inscritos = inscritos + 1;

const precio = 19.99; //number
const nombre = "Walter"; // string
const activo = true; // booblean
const ndad = null; // null
let indefinido; //undefined

console.log(typeof precio);
console.log(typeof nombre);
console.log(typeof activo);


// EJERCIO 

const PI = 3.14159;
let radio = 7;
let area = (PI * radio * radio);
console.log(area);

const number = 10;
const number2 = 3;
console.log(number + number2);
console.log(number * number2);

console.log(5 == 5);    //true
console.log(5 === 5);   //false

const edad = 20

const puedeVotar = edad >=18 && edad < 65;

console.log(puedeVotar)

// EJERCICIO #2

let numero = 5;
let esValido = numero > 10 && numero % 2 === 0;
console.log(esValido)


//// IF

const nota = 83;
let letra;

if (nota >= 90 ){
    letra = "A"
}
else if (nota >= 80){
    letra = "B"
}
else if (nota >= 70){
    letra = "D"
}
else{
    letra = "C"
}

console.log(letra)

// Switch

const dia = "martes"
switch(dia){
    case "lunes": 
        console.log("No es el dia ")
    case "martes": 
        console.log("Este es el dia ")
    case "miercoles": 
        console.log("No es el dia")
    default: 
        console.log("No es el dia ")
}

// OPERADOR TERNARIO

 const edad = 10;
 const esAdulto = (edad >= 18) ? "Si es mayor" : "NO es mayor";

 //EJERCICIO

 let temperatura = 45;
 if (temperatura < 15){
    console.log("Frio");
 }
 else if (temperatura >= 15 && temperatura <= 25){
    console.log("temaplado")
 }
 else if (temperatura > 25){
    console.log("Caliente")
 }
 else{
    console.log("Ingrese un valor valido")
 }

 switch(true){
    case  (temperatura < 15):
        console.log("Frio")
        break
    case (temperatura > 15 && temperatura < 25):
        console.log("tempaldo")
        break
    case(temperatura > 25):
        console.log("caliente")
        break
 }

 let temp = (temperatura < 25)? "Frio" : "Caliente";
 console.log(temp)

 let suma = 0
 for(let index = 1; index <= 5; index ++){
    suma += index
 }

 console.log(suma)


 let energia = 3

 while (energia > 0){
    console.log("Saltando... Energia restante " + energia);
    energia--; 
 }

 // CICLO DO WHILE: HAZLO ALMENOS UNA VEZ

 const passCorrecta = "1234"
 let passIngresada = ""

 do
 {
    passIngresada = "1234";
    console.log("Validando contrasena... ")
 }while (passIngresada != passCorrecta);

 console.log("Acceso concedido")

 const frutas = ["Manzanas", "Peras", "Uvas"]
 for (const fruta of frutas){
    console.log(fruta)
 }

 // Ejercicio

 const num = [2, 5, 7, 10, 11]
 total = 0
 for (const par of num){
    if (par % 2 === 0){
        total = total + par
    }
 }

 console.log(total)

 //DECLARACIONES TRADICIONALES

 function alCuadrado(num){
    return num * num
 }

 //FUNCION FLECHA
 const esPar = (num) => num % 2 === 0;

 //FUNCION POR DEFECTO
 function saludar(nombre = "Estuadiante"){
    return `hola ${nombre}!`
 }
*/
 //EJERCICIO

 function maximo(a, b, c){
    if (a > b && a > c){
        console.log(`El numero mayor es: ${a}`)
    }
    else if (b > a && b> c){
        console.log(`El numero mayor es: ${b}`)
    }
    else if (c > a && c> b){
        console.log(`El numero mayor es: ${c}`)
    }
    else{
        console.log("ERROR")
    }
 }

maximo(1,2,3)
maximo(5,80,7)

const max = (a,b,c) => {
    if (a > b && a > c){
        console.log(`El numero mayor es: ${a}`)
    }
    else if (b > a && b> c){
        console.log(`El numero mayor es: ${b}`)
    }
    else if (c > a && c> b){
        console.log(`El numero mayor es: ${c}`)
    }
    else{
        console.log("ERROR")
    }
}

max(45,65,2)
max(45,78,2)


//ARREGLOS Y MATRICES

const array = [1, 2, 3]
const matriz = [
    [1,2,3]
    [9,8,7]
]

console.log(matriz[1][2])

