const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
require('dotenv').config();
const path = require('path');

const rutaDatos = require("./routes/rutas")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/datos', (req, res) =>{
    const {nombre, apellido} = req.body
})

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
});