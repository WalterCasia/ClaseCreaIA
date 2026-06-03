/**
 * @file server.js
 * @description Servidor Express con endpoints academicos intencionalmente vulnerables
 * a diferentes tipos de Inyeccion SQL para demostracion, analisis y mitigacion.
 */

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const expressApplication = express();
expressApplication.use(express.json());
expressApplication.use(express.urlencoded({ extended: true }));
expressApplication.use(express.static(path.join(__dirname, 'public')));

/**
 * Configuracion basica para la conexion al motor de base de datos MySQL.
 * Las variables se toman del entorno local configurado en el archivo .env.
 */
const databaseConfiguration = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root1234',
    database: process.env.DB_NAME || 'aprendiendo_sql'
};

// Inicializacion del pool de conexiones para mejorar el manejo de recursos
const databasePool = mysql.createPool(databaseConfiguration);
const databaseConnection = databasePool.promise();

/**
 * @route GET /api/health
 * @description Verifica el estado de conexion a la base de datos MySQL
 */
expressApplication.get('/api/health', async (request, response) => {
    try {
        await databaseConnection.query('SELECT 1');
        response.json({ 
            status: 'connected', 
            message: 'Conectado a la base de datos MySQL con exito.' 
        });
    } catch (connectionError) {
        response.status(500).json({ 
            status: 'error', 
            message: 'Error de conexion: ' + connectionError.message 
        });
    }
});

/**
 * @route POST /api/login
 * @description Realiza autenticacion de usuarios.
 * Vulnerable a Bypass de Autenticacion mediante concatenacion directa.
 */
expressApplication.post('/api/login', async (request, response) => {
    const { username, password, secure } = request.body;
    let sqlQuery = '';
    
    try {
        if (secure === 'true' || secure === true) {
            // DEFENSA: Implementacion correcta mediante consultas parametrizadas
            sqlQuery = 'SELECT id, username, role, bio FROM users WHERE username = ? AND password = ?';
            const [queryResults] = await databaseConnection.query(sqlQuery, [username, password]);
            
            // Sanitizacion visual para mostrar en la interfaz la representacion de la consulta
            const sanitizedUsername = username.replace(/'/g, "''");
            const sanitizedPassword = password.replace(/'/g, "''");
            
            response.json({
                query: `SELECT id, username, role, bio FROM users WHERE username = '${sanitizedUsername}' AND password = '${sanitizedPassword}' (Parametrizada)`,
                success: queryResults.length > 0,
                user: queryResults[0] || null
            });
        } else {
            // VULNERABLE: Concatenacion directa de parametros del usuario (Inyeccion SQL clasica)
            sqlQuery = `SELECT id, username, role, bio FROM users WHERE username = '${username}' AND password = '${password}'`;
            const [queryResults] = await databaseConnection.query(sqlQuery);
            
            response.json({
                query: sqlQuery,
                success: queryResults.length > 0,
                user: queryResults[0] || null
            });
        }
    } catch (databaseError) {
        response.status(500).json({ 
            success: false, 
            error: databaseError.message, 
            query: sqlQuery 
        });
    }
});

/**
 * @route GET /api/products/search
 * @description Busqueda dinamica de productos.
 * Vulnerable a inyecciones basadas en UNION (UNION-based SQLi).
 */
expressApplication.get('/api/products/search', async (request, response) => {
    const { search, secure } = request.query;
    let sqlQuery = '';
    
    try {
        if (secure === 'true') {
            // DEFENSA: Utilizacion de comodines y marcadores de posicion liquidados correctamente
            sqlQuery = 'SELECT id, name, description, price, stock FROM products WHERE name LIKE ?';
            const [queryResults] = await databaseConnection.query(sqlQuery, [`%${search}%`]);
            
            const sanitizedSearch = search.replace(/'/g, "''");
            response.json({ 
                query: `SELECT id, name, description, price, stock FROM products WHERE name LIKE '%${sanitizedSearch}%' (Parametrizada)`, 
                results: queryResults 
            });
        } else {
            // VULNERABLE: Permite inyeccion UNION al no sanitizar ni parametrizar
            sqlQuery = `SELECT id, name, description, price, stock FROM products WHERE name LIKE '%${search}%'`;
            const [queryResults] = await databaseConnection.query(sqlQuery);
            
            response.json({ 
                query: sqlQuery, 
                results: queryResults 
            });
        }
    } catch (databaseError) {
        response.status(500).json({ 
            error: databaseError.message, 
            query: sqlQuery 
        });
    }
});

/**
 * @route GET /api/users/profile
 * @description Obtencion del perfil de usuario por ID numerico.
 * Vulnerable a inyecciones basadas en errores (Error-based SQLi).
 */
expressApplication.get('/api/users/profile', async (request, response) => {
    const { id, secure } = request.query;
    let sqlQuery = '';
    
    try {
        if (secure === 'true') {
            // DEFENSA: Parametrizacion y filtrado estricto
            sqlQuery = 'SELECT id, username, role, bio FROM users WHERE id = ?';
            const [queryResults] = await databaseConnection.query(sqlQuery, [id]);
            
            const numericIdOnly = id.replace(/[^0-9]/g, '');
            response.json({ 
                query: `SELECT id, username, role, bio FROM users WHERE id = ${numericIdOnly} (Parametrizada)`, 
                user: queryResults[0] || null 
            });
        } else {
            // VULNERABLE: Concatenacion directa. Se devuelven los errores de BD completos en el catch
            sqlQuery = `SELECT id, username, role, bio FROM users WHERE id = ${id}`;
            const [queryResults] = await databaseConnection.query(sqlQuery);
            
            response.json({ 
                query: sqlQuery, 
                user: queryResults[0] || null 
            });
        }
    } catch (databaseError) {
        // Didactico: Mostrar el error de sintaxis nativo de MySQL
        response.status(500).json({ 
            error: databaseError.message, 
            query: sqlQuery 
        });
    }
});

/**
 * @route GET /api/products/details
 * @description Consulta de existencia de un producto.
 * Vulnerable a inyecciones ciegas booleanas (Boolean Blind SQLi).
 */
expressApplication.get('/api/products/details', async (request, response) => {
    const { id, secure } = request.query;
    let sqlQuery = '';
    
    try {
        if (secure === 'true') {
            sqlQuery = 'SELECT name, description FROM products WHERE id = ?';
            const [queryResults] = await databaseConnection.query(sqlQuery, [id]);
            response.json({ 
                query: 'SELECT name, description FROM products WHERE id = ?', 
                exists: queryResults.length > 0 
            });
        } else {
            // VULNERABLE: Concatenacion directa sin manejo de errores detallado (Ciega)
            sqlQuery = `SELECT name, description FROM products WHERE id = ${id}`;
            const [queryResults] = await databaseConnection.query(sqlQuery);
            response.json({ 
                query: sqlQuery, 
                exists: queryResults.length > 0 
            });
        }
    } catch (databaseError) {
        // En una inyeccion ciega, el servidor devuelve una respuesta generica para ocultar errores
        response.json({ 
            query: sqlQuery, 
            exists: false, 
            error: 'Ocurrio un error en el servidor.' 
        });
    }
});

/**
 * @route GET /api/server/status
 * @description Comprobacion del estado de respuesta del servidor.
 * Vulnerable a inyecciones ciegas basadas en tiempo (Time-based SQLi).
 */
expressApplication.get('/api/server/status', async (request, response) => {
    const { id, secure } = request.query;
    let sqlQuery = '';
    const startTimeStamp = Date.now();
    
    try {
        if (secure === 'true') {
            sqlQuery = 'SELECT name FROM products WHERE id = ?';
            await databaseConnection.query(sqlQuery, [id]);
            response.json({
                query: 'SELECT name FROM products WHERE id = ?',
                status: 'OK',
                timeMs: Date.now() - startTimeStamp
            });
        } else {
            // VULNERABLE: Concatenacion directa susceptible a funciones de demora (SLEEP)
            sqlQuery = `SELECT name FROM products WHERE id = ${id}`;
            await databaseConnection.query(sqlQuery);
            response.json({
                query: sqlQuery,
                status: 'OK',
                timeMs: Date.now() - startTimeStamp
            });
        }
    } catch (databaseError) {
        response.json({
            query: sqlQuery,
            status: 'ERROR',
            timeMs: Date.now() - startTimeStamp
        });
    }
});

/**
 * @route POST /api/users/update-bio
 * @description Actualizacion de informacion del perfil del usuario.
 * Vulnerable a inyecciones en sentencias de modificacion de datos (UPDATE Injection).
 */
expressApplication.post('/api/users/update-bio', async (request, response) => {
    const { userId, bio, secure } = request.body;
    let sqlQuery = '';
    
    try {
        if (secure === 'true' || secure === true) {
            // DEFENSA: Sentencias preparadas para UPDATE
            sqlQuery = 'UPDATE users SET bio = ? WHERE id = ?';
            await databaseConnection.query(sqlQuery, [bio, userId]);
            response.json({
                query: 'UPDATE users SET bio = ? WHERE id = ? (Parametrizada)',
                success: true,
                message: 'Biografia actualizada correctamente de forma segura.'
            });
        } else {
            // VULNERABLE: Modificacion de sentencias mediante concatenacion de campos no sanitizados
            sqlQuery = `UPDATE users SET bio = '${bio}' WHERE id = ${userId}`;
            await databaseConnection.query(sqlQuery);
            
            response.json({
                query: sqlQuery,
                success: true,
                message: 'Biografia actualizada (Metodo Inseguro).'
            });
        }
    } catch (databaseError) {
        response.status(500).json({ 
            success: false, 
            error: databaseError.message, 
            query: sqlQuery 
        });
    }
});

/**
 * @route POST /api/database/console
 * @description Permite a los estudiantes ejecutar comandos SQL sin restricciones en la base de datos
 * local para comprobar los impactos reales y observar la manipulacion de datos de forma directa.
 */
expressApplication.post('/api/database/console', async (request, response) => {
    const { sqlStatement } = request.body;
    try {
        const [queryResults] = await databaseConnection.query(sqlStatement);
        response.json({ success: true, results: queryResults });
    } catch (databaseError) {
        response.status(400).json({ success: false, error: databaseError.message });
    }
});

/**
 * @route POST /api/database/reset
 * @description Endpoint didactico para limpiar y restablecer el estado inicial
 * de las tablas academica a sus valores por defecto.
 */
expressApplication.post('/api/database/reset', async (request, response) => {
    try {
        await initializeDatabase();
        response.json({ success: true, message: 'Base de datos restablecida correctamente.' });
    } catch (resetError) {
        response.status(500).json({ success: false, error: resetError.message });
    }
});


/**
 * @function initializeDatabase
 * @description Inicializacion y poblamiento de tablas automatico.
 * Facilita el despliegue autonomo del laboratorio en entornos locales.
 */
async function initializeDatabase() {
    try {
        // Desactivacion temporal de llaves foraneas para permitir limpieza sin conflictos
        await databaseConnection.query('SET FOREIGN_KEY_CHECKS = 0');
        await databaseConnection.query('DROP TABLE IF EXISTS users, products');
        await databaseConnection.query('SET FOREIGN_KEY_CHECKS = 1');

        // Creacion de la tabla estructurada de usuarios académicos
        await databaseConnection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                bio VARCHAR(255) DEFAULT 'Estudiante de desarrollo seguro',
                secret_note VARCHAR(255) DEFAULT 'Bandera Secreta: {SQL_INJECTION_EXPERT}'
            )
        `);
        
        // Creacion de la tabla estructurada de productos académicos
        await databaseConnection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL
            )
        `);

        // Poblamiento inicial seguro de la tabla de usuarios
        const [usersRows] = await databaseConnection.query('SELECT COUNT(*) as count FROM users');
        if (usersRows[0].count === 0) {
            await databaseConnection.query(`
                INSERT INTO users (id, username, password, role, bio, secret_note) VALUES
                (1, 'admin', 'SuperSecurePassword2026!', 'administrator', 'Administrador principal del sistema academico.', 'Bandera de Administrador: {UNION_SUCCESS_FLAG_99}'),
                (2, 'drozco', 'profesor123', 'teacher', 'Profesor de seguridad informatica.', 'Clave de examen: El examen es el proximo martes.'),
                (3, 'alumno_test', 'invitado123', 'student', 'Estudiante de prueba aprendiendo inyecciones.', 'Anotacion: Me cuesta entender las ciegas basadas en tiempo.')
            `);
            console.log('[Auto-Setup] Base de datos poblada con usuarios iniciales.');
        }

        // Poblamiento inicial seguro de la tabla de productos
        const [productsRows] = await databaseConnection.query('SELECT COUNT(*) as count FROM products');
        if (productsRows[0].count === 0) {
            await databaseConnection.query(`
                INSERT INTO products (id, name, description, price, stock) VALUES
                (1, 'Laptop Avanzada X', 'Computadora portatil ideal para desarrollo y pentesting.', 1200.00, 15),
                (2, 'Teclado Mecanico RGB', 'Teclado mecanico con switches silenciosos y retroiluminacion.', 89.99, 42),
                (3, 'Monitor Curvo 4K 27"', 'Monitor ultra-alta definicion para maxima productividad.', 349.50, 8),
                (4, 'Libro: Fundamentos de Ciberseguridad', 'Guia completa desde criptografia hasta desarrollo seguro.', 45.00, 100),
                (5, 'Mouse Gamer Inalambrico', 'Mouse de alta precision con bateria recargable.', 59.99, 25)
            `);
            console.log('[Auto-Setup] Base de datos poblada con productos iniciales.');
        }
    } catch (initializationError) {
        if (initializationError.code === 'ER_BAD_DB_ERROR') {
            console.log('[Auto-Setup] La base de datos no existe. Creando base de datos "aprendiendo_sql"...');
            try {
                // Instanciacion de conexion temporal para crear la base de datos
                const temporaryConnection = await mysql.createConnection({
                    host: databaseConfiguration.host,
                    port: databaseConfiguration.port,
                    user: databaseConfiguration.user,
                    password: databaseConfiguration.password
                }).promise();
                
                await temporaryConnection.query('CREATE DATABASE IF NOT EXISTS aprendiendo_sql');
                await temporaryConnection.end();
                
                console.log('[Auto-Setup] Base de datos "aprendiendo_sql" creada. Reintentando inicializacion...');
                await initializeDatabase();
            } catch (creationError) {
                console.error('[Auto-Setup Error] Error critico al crear base de datos:', creationError.message);
            }
        } else {
            console.error('[Auto-Setup Error] No se pudo inicializar las tablas automaticamente:', initializationError.message);
        }
    }
}

const SERVER_PORT = process.env.PORT || 3000;

/**
 * @function startServer
 * @description Inicia la escucha de peticiones HTTP en el puerto especificado.
 * Posee control de redundancia para evitar colisiones de puertos (EADDRINUSE).
 * @param {number} portAttempt - Puerto en el cual intentar levantar el servidor.
 */
function startServer(portAttempt) {
    const listeningServer = expressApplication.listen(portAttempt, async () => {
        console.log(`======================================================`);
        console.log(`Servidor corriendo en http://localhost:${portAttempt}`);
        console.log(`Laboratorio de Inyeccion SQL Academico listo.`);
        console.log(`======================================================`);
        
        await initializeDatabase();
    });

    listeningServer.on('error', (serverStartupError) => {
        if (serverStartupError.code === 'EADDRINUSE') {
            console.log(`[Puerto Ocupado] El puerto ${portAttempt} ya esta en uso. Probando el puerto alternativo http://localhost:${portAttempt + 1}...`);
            startServer(portAttempt + 1);
        } else {
            console.error('[Error Critico] Error critico al iniciar el servidor:', serverStartupError);
        }
    });
}

startServer(parseInt(SERVER_PORT));
