const express = require('express');
const app = express();
const PORT = 3800;

const rutaCursos = require('./routes/cursos');

app.use(express.json());

app.use('/cursos', rutaCursos);

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
});