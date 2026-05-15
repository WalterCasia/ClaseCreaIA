const express = require('express');
const app = express();
const PORT = 2080;

app.post('/despacho', (req, res) =>{
    console.log("Verificando espacio en hangar...")
    const peso = req.body
    setTimeout(() => {
        if (peso > "500"){
            return res.status(400).json({ error: "Capacidad de hangar excedida" });
        }
        else if (peso < "400"){
            res.json({mensaje: "confirmando el registro del paquete"})
        }
    }, 1500);
})

app.listen(PORT, () =>{
     console.log("Servidor activo en le puerto " + PORT);
     console.log(`Servidor escuchando en http://localhost:${PORT}`);
})