const piloto = process.argv[2];
const cargaRaw = process.argv[3];
const capacidadRaw = process.argv[4];

if (!piloto || cargaRaw === undefined || capacidadRaw === undefined) {
    console.error("Error: Faltan argumentos en la línea de comandos.");
    process.exit(1);
}

const carga = Number(cargaRaw);
const capacidad = Number(capacidadRaw);

if (isNaN(carga) || isNaN(capacidad)) {
    console.error("Error: Los datos de carga y capacidad deben ser números válidos.");
    process.exit(1);
}

const calcularPorcentaje = (carga, capacidad) => (carga / capacidad) * 100;

const porcentaje = calcularPorcentaje(carga, capacidad);
const estado = porcentaje >= 90 ? "Peligro" : "Seguro";

const reporte = {
    piloto: piloto,
    carga: carga,
    capacidad: capacidad,
    porcentaje: porcentaje,
    estado: estado
};

console.log(`Analizando despacho para: ${piloto}...`);
console.log(reporte);

if (estado === "Peligro") {
    console.log("¡ALERTA!: Peso excedido, despegue abortado.");
}