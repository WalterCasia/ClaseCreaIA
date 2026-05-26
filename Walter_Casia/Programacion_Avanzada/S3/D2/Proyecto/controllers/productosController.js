const Producto = require("../models/productoModel");

function validarNuevoUpdate(body) {
    const faltantes = [];

    if (!body.nombre) {
        faltantes.push("nombre");
    }
    if (!body.categoria) {
        faltantes.push("categoria");
    }
    if (!body.marca) {
        faltantes.push("marca");
    }
    if (faltantes.length) {
        return `Faltan campos: ${faltantes.join(", ")}`;
    }

    return null;
}

exports.obtenerTodos = (req, res) => {
    Producto.obtenerTodos((err, filas) => {
        if (err)
            return res.status(500).send("Error al obtener el producto");

        res.json(filas);
    });
};

exports.obtenerPorId = (req, res) => {
    const id = req.params.id; 

    Producto.obtenerPorId(id, (err, filas) => {
        if (err)
            return res.status(500).send("Error al obtener un producto");

        if (!filas || filas.length === 0)
            return res.status(404).send("Producto no encontrado");
            
        res.json(filas[0]);
    });
};

exports.crear = (req, res) => {
    
    const error = validarNuevoUpdate(req.body); 

    if (error)
        return res.status(400).send(error);

    Producto.crear(req.body, (err, resultado) => {
        if (err)
            return res.status(500).send("Error al crear el producto"); 
            
        res.status(201).json({ mensaje: "Producto creado", id: resultado.insertId });
    });
};
