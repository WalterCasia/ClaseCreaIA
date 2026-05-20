const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/confirmar', (req, res) => {
    const { nombre, correo } = req.body;

    console.log(`[SERVIDOR] Datos recibidos. Nombre ${nombre} | correo ${correo}`);

    
    const querySQL = `INSERT INTO asistentes (nombre, correo) VALUES (?, ?)`;

    
    db.query(querySQL, [nombre, correo], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            return res.status(500).send('Error al registrar asistencia');
        }

        
        console.log(`[BD] Registro guardado con éxito.`);
        
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Aviso</title>
            </head>
            <body>
                <script>
                    alert("¡Asistencia agregada con éxito!");
                </script>
            </body>
            </html>
        `);
    }); 
}); 

app.get('/asistencias', (req, res) => {
    console.log('[SERVIDOR] petición GET recibida. Solicitando asistencias...')

    const querySQL = 'SELECT * FROM asistentes ORDER BY id';

    db.query(querySQL, (err, resultado) => {
        if (err) {
            console.error("Error al consultar la base de datos: ", err)
            return res.status(500).send("<h1>Error crítico. No se pudo recuperar la información")
        }

        let filasHTML = ''

        resultado.forEach( (asistentes) => {
            filasHTML += `
                <tr>
                    <td>${asistentes.id}</td>
                    <td>${asistentes.nombre}</td>
                    <td>${asistentes.correo}</td>    
                </tr>
            <br>
            `
        } );

        if (resultado.length === 0)
        {
            filasHTML = '<h1>No hay asistencias registradas</h1>'
        }

        res.send(
            `
            <!DOCTYPE html>
            <html lan="es">
            <head>
                <title>Asistencias</title>
            </head>
            <body>
                ${filasHTML}
            </body>
            `
        )


    })

} )


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
