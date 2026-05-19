const express = require('express');
const path = require('path')
const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, ' public')));

app.use(express.urlencoded({extended: true}))

app.post('/enviar_datos', (res, req) =>{
    const{nombre, id} = req.body;
    console.log(`Nombre: ${nombre} ID: ${id} `)
    res.sendFile(path.join(__dirname,'public', 'agradecimiento.html'))
});

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})
