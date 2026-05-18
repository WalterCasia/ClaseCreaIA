// Laboratorio integrador
//Ejercicio 1: Construcción de un Servidor de Consulta (GET)
//Ejercicio 2: El Receptor de Datos (POST)

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const procesarEstudiantes = (lista, callback) => {
if (!Array.isArray(lista) || lista.length === 0) {
return callback(Error('La lista de estudiantes está vacía o no es válida'));
}

const aprobados = [];
const reprobados = [];

lista.forEach((estudiante) => {
    if (estudiante.nota >= 70) {
        aprobados.push(estudiante.nombre);
    } else {
        reprobados.push(estudiante.nombre);
    }
});

callback(null, {
aprobados,
reprobados,
total: lista.length
});
};

app.post('/analizar-clase', (req, res) => {
    const { estudiantes } = req.body;

    procesarEstudiantes(estudiantes, (error, reporte) => {
    if (error) {
        return res.status(400).json({ status: 'error', mensaje: error.message });
        }
    res.status(200).json({ status: 'success', reporte });
    });
});

app.listen(PORT, () => {
console.log('Servidor activo en el puerto ' + PORT);
});

//Ejercicio 3: El Motor de Calificaciones

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const procesarEstudiantes = (lista, callback) => {
if (!Array.isArray(lista) || lista.length === 0) {
return callback(new Error('La lista de estudiantes está vacía o no es válida'));
}

const aprobados = [];
const reprobados = [];

lista.forEach((estudiante) => {
if (estudiante.nota >= 70) {
aprobados.push(estudiante.nombre);
} else {
reprobados.push(estudiante.nombre);
}
});

callback(null, {
aprobados,
reprobados,
total: lista.length
});
};

app.post('/analizar-clase', (req, res) => {
const { estudiantes } = req.body;

procesarEstudiantes(estudiantes, (error, reporte) => {
if (error) {
return res.status(400).json({ status: 'error', mensaje: error.message });
}
res.status(200).json({ status: 'success', reporte });
});
});

app.listen(PORT, () => {
console.log('Servidor activo en el puerto ' + PORT);
});

//Ejercicio 4: Enunciado de Análisis - Sistema de Logística "Aethelgard Express"
// server.js
const express = require(‘express’);
const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/despacho', (req, res) => {
const { nombre, peso } = req.body;

setTimeout(() => {
if (peso > 500) {
return res.status(400).json({ mensaje: 'Capacidad de hangar excedida' });
}


console.log(`[LOG] Recibido pedido de ${nombre} (${peso}kg). Estado: ACEPTADO.`);
res.status(200).json({
  mensaje: 'Despacho programado',
  id: 'A-102'
});


}, 1500);
});

app.listen(PORT, () => {
console.log('Servidor Aethelgard activo en el puerto ' + PORT);
});

// Ejercicio 5: Sistema de Filtros "IRSI Talent"

const express = require(‘express’);
const app = express();
const PORT = 3000;

app.get('/buscar', (req, res) => {
const { nombre, rol } = req.query;

if (!nombre) {
return res.status(400).json({
mensaje: "Error: El parámetro 'nombre' es obligatorio para la búsqueda."
});
}

