const mysql = require('mysql2');

// creamos la conexión a la base de datos con las credenciales 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'base_control'
});

// validar si el puente de comunicación está abierto 
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

module.exports = connection;

