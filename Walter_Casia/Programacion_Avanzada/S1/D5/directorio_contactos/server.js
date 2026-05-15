const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hola', (req, res) =>{
    res.send("<h1>!Hola estudiantes!</h1><p>El servidor responde</p>")
});

app.get('/contacto', (req, res) => {
    res.json({
        nombre : "Soporte Tecnico",
        email : "ayuda@irsi.com",
        extension : 2205
    })
});

app.post('/analizarclase', (req, res) => {
    const notasEstudiantes = req.body
    procesarEstudiantes(notasEstudiantes)
    res.json({status: "success", reporte: { aprobados: aprobados, reprobados: reprobados, total: contador} })
})

app.post('/registrar', (req, res) => {
    const infoEstudiante = req.body;

    console.log("Datos recibidos:", infoEstudiante);

    res.status(201).json({
        mensaje : "Estudiante registrado con exito",
        datos_recibidos: infoEstudiante
    });
});

////////////////////////////////

function procesarEstudiantes (lista, callback) {
    if (!lista || lista === undefined || lista === []){
        console.error("ERROR Ingrese unicamente lista y valide que tenga datos")
    }

    const aprobados = [];
    const reprobados = [];

    lista.nota.forEach((estudiante) => {
        const calificacion = lista.nota
    
        if (calificacion > 70){
            aprobados.push(lista.nombre)
        }
        else if (calificacion < 70){
            reprobados.push(lista.nombre)
        }
    contador = lista.lenght

    return aprobados
    return reprobados
    return contador 
    });
    
};

////////////////////////////////
app.listen(PORT, () =>{
     console.log("Servidor activo en le puerto " + PORT);
     console.log(`Servidor escuchando en http://localhost:${PORT}`);
})
