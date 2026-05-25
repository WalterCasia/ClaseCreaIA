const express = require('express')
const app = express()

const rutaUsuarios = require('./routes/usuarios');

app.use(express.json())

app.use('/usuarios', rutaUsuarios)

app.listen(3000, () =>{
    console.log("servidor corriendo en el puerto 3000")
})