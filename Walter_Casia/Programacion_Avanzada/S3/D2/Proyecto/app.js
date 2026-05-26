const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const productosRouter = require("./routes/productos");


app.use("/productos", productosRouter);

app.get("/", (req, res) => {
    res.send("<h1>Servidor MVC funcionando</h1>");
});

app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
