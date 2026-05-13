function getFlag(name) {
    //  si no existe, me devuelve -1, si existe me devuelve el indice
    const idx = process.argv.indexOf(`--${name}`);

    if (idx !== -1 && name === "help") {
        return true;
    }

    if (idx !== -1 && 
        idx + 1 < process.argv.length && 
        process.argv[idx + 1] &&
        !process.argv[idx + 1].startsWith("--")) {
        return process.argv[idx + 1];
    }

    return "Invitado";
}

function printUsage() {
    console.log("Uso: node flags.js --name <nombre> --times <veces>");
    console.log("--name: Especifica el nombre a saludar (opcional, por defecto 'Invitado').");
    console.log("--times: Especifica cuántas veces repetir el saludo (opcional, por defecto 1).");
}



const name = getFlag("name");
const times = Number(getFlag("times")) || 1;
const helpFlag = getFlag("help") || false;

if (!Number.isInteger(times) || times <= 0) {
    console.error("El valor de --times debe ser un número entero positivo.");
    process.exit(1);
}

for (let index =0; index < times; index++) {
    console.log(`Hola ${name}, bienvenido a la programación avanzada!`);
}

if (helpFlag) {
    printUsage();
}


