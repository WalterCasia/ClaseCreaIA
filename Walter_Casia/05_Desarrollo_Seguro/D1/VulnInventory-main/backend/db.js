const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root1234',
  database: process.env.DB_NAME || 'aprendiendo_sql',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Metodo auxiliar para ejecutar consultas directas
const queryRaw = (sql) => {
  return new Promise((resolve, reject) => {
    // Registro de consulta
    console.log(`[SQL EXECUTION]: ${sql}`);
    pool.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Metodo auxiliar para consultas alternativas
const querySafe = (sql, params) => {
  return new Promise((resolve, reject) => {
    console.log(`[SECURE SQL EXECUTION]: ${sql} | Params: ${JSON.stringify(params)}`);
    pool.execute(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Auto-initialization function to ensure the database and tables are created out-of-the-box
const initializeDatabase = async () => {
  const fs = require('fs');
  const path = require('path');
  
  const dbName = process.env.DB_NAME || 'aprendiendo_sql';
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root1234',
    port: process.env.DB_PORT || 3306
  };

  return new Promise((resolve, reject) => {
    // 1. Bootstrapping: Connect without database first to ensure the DB exists
    const tempConnection = mysql.createConnection(connectionConfig);
    
    tempConnection.connect((err) => {
      if (err) {
        console.error(`[DB BOOTSTRAP ERROR]: No se pudo conectar a MySQL. Asegurate de que el servidor este encendido y las credenciales en .env sean correctas.`);
        tempConnection.destroy();
        return reject(err);
      }

      tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err) {
          tempConnection.destroy();
          return reject(err);
        }

        tempConnection.destroy();

        // 2. Main Verification: Check if the 'users' table already exists
        pool.query(`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '${dbName}' AND table_name = 'users'`, async (error, results) => {
          if (error) {
            return reject(error);
          }

          const tableExists = results[0]['COUNT(*)'] > 0;
          if (tableExists) {
            console.log(`[DB INITIALIZATION]: La base de datos ya contiene las tablas. Saltando creacion.`);
            return resolve();
          }

          console.log(`[DB INITIALIZATION]: Inicializando base de datos aprendiendo_sql por primera vez...`);
          try {
            // Read and parse schema.sql
            const schemaPath = path.join(__dirname, '../schema.sql');
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');

            // Split queries by semicolon, removing comments and trimming whitespace
            const queries = schemaSql
              .split(';')
              .map(q => q.replace(/--.*$/gm, '').trim())
              .filter(q => q.length > 0);

            // Execute each query sequentially
            for (const query of queries) {
              await new Promise((res, rej) => {
                pool.query(query, (err) => {
                  if (err) return rej(err);
                  res();
                });
              });
            }

            console.log(`[DB INITIALIZATION]: Base de datos y tablas creadas exitosamente.`);
            resolve();
          } catch (initErr) {
            console.error(`[DB INITIALIZATION ERROR]: Error al ejecutar schema.sql:`, initErr.message);
            reject(initErr);
          }
        });
      });
    });
  });
};

module.exports = {
  pool,
  queryRaw,
  querySafe,
  initializeDatabase
};
