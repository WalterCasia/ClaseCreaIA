const express = require('express');
const app = express();
const port = 2080;

app.use(express.json());

app.post("/login", (req, res) => {
    const {usuario, password} = req.body;
    if (usuario === "admin" && password === "1234"){
        res.json({status: "ok", mensaje: "Login exitoso"})
    }
    else{
        res.json({status: "error", mensaje: "Credenciales invalidas"})
    }
})


app.listen(port, () => {console.log (`Servidor escuchando en http://localhost:${port}`)});