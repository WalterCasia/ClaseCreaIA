
const Usuario = require("../models/usuarioModel");

function validarNombre(body){
    if (!body || !body.nombre){
        return `Faltan campo nombre`;
    }
    return null;
}

exports.obtenerTodos = (req, res) => {
    Usuario.obtenerTodos((err, filas) => {
        
        if (err) {
            console.error("Error interno en la BD:", err);
            return res.status(500).send("Error al obtener el usuario");
        }
        return res.json(filas);
    });
};

exports.obtenerPorId = (req, res) => {
    const id = req.params.id;

    Usuario.obtenerPorId(id, (err, filas) => {
        
        if (err) {
            console.error("Error interno en la BD:", err);
            return res.status(500).send("Error al obtener el usuario");
        }

       
        if (!filas || filas.length === 0) {
            return res.status(404).send("usuario no encontrado");
        }

        return res.json(filas[0]);
    });
};

exports.crear = (req, res) => {
    const error = validarNombre(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    Usuario.crear(req.body, (err, resultado) => {
        
        if (err) {
            console.error("Error interno en la BD:", err);
            return res.status(500).send("Error al crear el usuario");
        }

        return res.status(201).json({ Mensaje: "usuario creado", id: resultado.insertId });
    });
};

exports.actualizar = (req, res) => {
    const id = req.params.id;
    const datos = req.body; 
    
    const error = validarNombre(datos);
    if (error) {
        return res.status(400).send(error);
    }

    Usuario.actualizar(id, datos, (err, filas) => {
        if (err) {
            console.error("Error interno en la BD:", err);
            return res.status(500).send("Error al actualizar el usuario");
        }
        
        return res.status(200).json({ mensaje: "Usuario actualizado con éxito", id });
    });
};

exports.eliminar = (req, res) => {
    const id = req.params.id;

    Usuario.eliminar(id, (err, resultado) => {

        if (err) {
            console.error("Error interno en la BD:", err);
            return res.status(500).send("Error al eliminar el usuario");
        }

        return res.status(200).json({ mensaje: "Usuario eliminado", id: id });
    });
};
