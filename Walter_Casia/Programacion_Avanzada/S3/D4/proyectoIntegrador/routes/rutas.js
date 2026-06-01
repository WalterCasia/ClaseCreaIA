const express = require('express');
const router = express.Router();

router.post('/resultado', async (req, res) => {
  const { nombre, apellido } = req.body;

  try {
    
    const actividadRes = await fetch('https://bored-api.appbrewery.com/random');
    const actividadData = await actividadRes.json();
    const actividad = actividadData.activity;
    
    const imagenRes = await fetch('https://dog.ceo/api/breeds/image/random');
    const imagenData = await imagenRes.json();
    const imagenURL = imagenData.message;
    
    console.log('Actividad:', actividad);
    console.log('Imagen URL:', imagenURL);

    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Resultado</title>
      </head>
      <body>
      <style>
        body{
        font-family: Arial, sans-serif;
        background-color: #C46210;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        }
        h1{
        color: white;
        padding: 20px;
        text-align: center;
        
        }
        .actividad{
        color:white;
        padding: 20px;
        text-align: center;}
      </style>
        <div class="tarjeta">
          <h1>¡Hola, ${nombre} ${apellido}!</h1>
          <div class="actividad">
            <strong>Actividad del día:</strong><br>${actividad}
          </div>
          <img src="${imagenURL}" width="400" height="350">
          <br>
          <a href="/">Volver al inicio</a>
        </div>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('Error:', error);
    res.send('<h2>Error al obtener los datos. Intenta de nuevo.</h2>');
  }
});

module.exports = router;