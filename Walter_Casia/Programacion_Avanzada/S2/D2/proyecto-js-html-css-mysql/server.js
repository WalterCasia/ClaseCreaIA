const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

// middleware d configuración
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/misiones', (req, res) => {
    const { nombre, destino, rango_peligro, detalles } = req.body;

    console.log(`[SERVIDOR] Datos recibidos desde la web. Nave ${nombre} hacia ${destino}`);

    const querySQL = `
        INSERT INTO misiones (nombre_nave, destino, rango_peligro, detalles) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(querySQL, [nombre, destino, rango_peligro, detalles], (err, results) => {
        if (err) {
            console.error('Error al insertar misión en la base de datos:', err);
            return res.status(500).send('Error al registrar la misión');
        }

        // si la inserción fue exitosa, respondemos al usuario con un mensaje de éxito
        console.log(`[DB] Registro guardado con éxito. ID de la misión: ${results.insertId}`);

        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>  
                <meta charset="UTF-8">
                <title>Misión Registrada</title>
            </head>
            <body>
                <h1>¡Misión Registrada con Éxito!</h1>  
                <p>La nave <strong>${nombre}</strong> ha sido registrada para su misión hacia <strong>${destino}</strong>.</p>
            </body>
            </html>
        `);
    });
});


app.get('/misiones', (req, res) => {
    console.log('[SERVIDOR] petición GET recibida. Solicitando historial de misiones...')

    const querySQL = 'SELECT * FROM misiones ORDER BY id';

    db.query(querySQL, (err, resultado) => {
        if (err) {
            console.error("Error al consultar la base de datos: ", err)
            return res.status(500).send("<h1>Error crítico. No se pudo recuperar la información")
        }

        let filasHTML = ''

        resultado.forEach( (mision) => {
            filasHTML += `
                <tr>
                    <td>${mision.id}</td>
                    <td><strong>${mision.nombre_nave}</td>
                    <td>${mision.destino}</td>
                    <td>${mision.rango_peligro}</td>
                    <td>${mision.detalles || 'Sin detalles'}</td>
                    
                </tr>
            <br>
            `
        } );

        if (resultado.length === 0)
        {
            filasHTML = '<h1>No hay misiones espaciales</h1>'
        }

        res.send(
            `
            <!DOCTYPE html>
            <html lan="es">
            <head>
                <title>Bitácora de misiones</title>
            </head>
            <body>
                ${filasHTML}
            </body>
            `
        )


    })

} )

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});