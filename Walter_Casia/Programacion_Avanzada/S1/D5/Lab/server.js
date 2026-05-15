const express = require('express');
const app = express();
const PORT = 4000;


// http://localhost:3000/vuelos?origen=NYC&estado=confirmado

app.get('/vuelos', (req, res) => {
    // const { origen, estado } = req.query;
    const origen = req.query.origen;
    const estado = req.query.estado;

    // paso 1: vlaidar si el dato está presente
    if (!origen || !estado) {
        return res.status(400).json({ error: "Faltan parámetros 'origen' o 'estado'" });
    }

    // paso 2: verificar el estado del vuelo 
    if (estado !== "confirmado" && estado !== "cancelado") {
        return res.status(400).json({ error: "El parámetro 'estado' debe ser 'confirmado' o 'cancelado'" });
    }
    
    // paso 3: procesar la solicitud y enviar una respuesta
    res.json({ mensaje: `Vuelos desde ${origen} con estado ${estado}` });

});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});