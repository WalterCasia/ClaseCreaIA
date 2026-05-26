const express = require("express");
const app = express();
const PORT = 3080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const usuariosRouter = require("./routes/usuarios");

app.use("/usuarios", usuariosRouter);

app.get("/", (req, res) => {
    res.send("<h1>Servidor Usuarios funcionando</h1>");
});

app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});