const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);
const altura = parseFloat(process.argv[4]);
const edad = parseInt(process.argv[5], 10);

if (isNaN(num1) || isNaN(num2)) {
    console.error("Por favor, proporciona dos números como argumentos.");
    console.log("Uso: node suma.js <num1> <num2>");
    process.exit(1);
}

const resultado = num1 + num2;
console.log(`La suma de ${num1} y ${num2} es: ${resultado}`);