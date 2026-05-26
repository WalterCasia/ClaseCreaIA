const mysql = require("mysql2");
const { obtenerTodos } = require("../../Proyecto/models/productoModel");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "aprendiendo_sql"
});

conexion.connect((err) =>{
    if(err){
        console.log("Error al conectar con mysql" , err.message);
    }else{
        console.log("conexion con mysql desde modelo exitosa");
    }
});

const Usuario = {
    obtenerTodos: (callback) =>{
        const sql = "SELECT * FROM usuarios";
        conexion.query(sql, callback);
    },
    obtenerPorId: (id, callback) => {
        const sql = "SELECT * FROM usuarios WHERE id=?";
        conexion.query(sql, [id], callback);
    },
    crear: (datos, callback) =>{
        const sql = `INSERT INTO usuarios (nombre, edad, altura, correo, empresa_id, foto_url)
        VALUES (?,?,?,?,?,?)`;
        const valores = [
            datos.nombre,
            datos.edad,
            datos.altura,
            datos.correo || null,
            datos.empresa_id || null,
            datos.foto_url || null
        ];
        conexion.query(sql, valores, callback);
    },
    actualizar: (id, datos, callback) =>{
        const sql = `UPDATE usuarios
                        SET nombre=?, edad=?, altura=?, correo=?, empresa_id=?, foto_url=?
                        WHERE id=? `

        const valores =[
            datos.nombre,
            datos.edad,
            datos.altura,
            datos.correo || null,
            datos.empresa_id || 0,
            datos.foto_url || null,
            id
        ];
        conexion.query(sql, valores, callback);
    },
    eliminar: (id, callback) =>{
        const sql = "DELETE FROM usuarios WHERE id=?";
        conexion.query(sql, [id], callback);
    }
};

module.exports = Usuario