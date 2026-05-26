const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "aprendiendo_sql"
});

conexion.connect((err) => {
    if (err) {
        console.log("Error al conectar con mysql", err.message);
    } else {
        console.log("Conexión a mysql desde modelo exitosa");
    }
});

const Producto = {
    obtenerTodos: (callback) => { 
        const sql = "SELECT * FROM productos";
        conexion.query(sql, callback);
    },
    obtenerPorId: (id, callback) => {
        const sql = "SELECT * FROM productos WHERE id=?";
        conexion.query(sql, [id], callback);
    },
    crear: (datos, callback) => {
        const sql = `INSERT INTO productos (nombre, categoria, marca, precio, stock, proveedor_email, rating, creado_es, descuento) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const valores = [
            datos.nombre,
            datos.categoria,
            datos.marca,
            datos.precio || 0,
            datos.stock || 0,
            datos.proveedor_email || null,
            datos.rating || 0,
            datos.creado_es || null,
            datos.descuento || 0
        ];
        conexion.query(sql, valores, callback);
    },
    actualizar: (id, datos, callback) => {
        const sql = `UPDATE productos
                        SET nombre=?, categoria=?, marca=?, precio=?, stock=?, proveedor_email=?, rating=?, creado_es=?, descuento=?
                        WHERE id=?`;
        const valores = [
            datos.nombre,
            datos.categoria,
            datos.marca,
            datos.precio || 0,
            datos.stock || 0,
            datos.proveedor_email || null,
            datos.rating || 0,
            datos.creado_es || null,
            datos.descuento || 0,
            id
        ];
        conexion.query(sql, valores, callback);
    },
    eliminar: (id, callback) => {
        const sql = "DELETE FROM productos WHERE id=?";
        conexion.query(sql, [id], callback);
    }
};

module.exports = Producto;
