function saludo(nombre) {
    console.log(`Hola ${nombre}, bienvenido a la programación avanzada!`);
}

const nombre = process.argv[2];

if (!nombre) {
    console.error("Por favor, proporciona un nombre como argumento.");
    console.log("Uso: node S1D2.js <nombre>");
    process.exit(1); // Salir con un código de error
}


saludo(nombre);

