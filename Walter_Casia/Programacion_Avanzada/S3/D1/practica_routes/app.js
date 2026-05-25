const express = require('express')
const app = express()
const PORT = 3080

const rutaProductos = require('./routes/productos')

app.use(express.json())

app.use('/productos', rutaProductos)

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
})