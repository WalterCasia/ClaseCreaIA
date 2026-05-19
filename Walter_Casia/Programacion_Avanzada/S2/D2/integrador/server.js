const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/misiones', (req, res) => {
    const { nombre, destino, rango_peligro, detalles } = req.body;

    console.log(`[SERVIDOR] Datos recibidos. Nave ${nombre} va hacia ${destino}`);

    
    const querySQL = `INSERT INTO misiones (nombre_nave, destino, rango_peligro, detalles) VALUES (?, ?, ?, ?)`;

    
    db.query(querySQL, [nombre, destino, rango_peligro, detalles], (err, result) => {
        if (err) {
            console.error('Error al insertar misión en la base de datos:', err);
            return res.status(500).send('Error al registrar la misión');
        }

        
        console.log(`[BD] Registro guardado con éxito. ID de la misión: ${result.insertId}`);
        
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Aviso</title>
            </head>
            <body>
                <script>
                    alert("¡Misión registrada con éxito!");
                </script>
            </body>
            </html>
        `);
    }); 
}); 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
