const express = require('express');
const path = require('path');
const routes = require('./routes');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api', routes);

// Fallback to index.html for SPAs (if client-side routing is used)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server after verifying / initializing the database schema
db.initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`===========================================================`);
      console.log(`[VULN-INVENTORY] Servidor corriendo en puerto ${PORT}`);
      console.log(`Accede a la aplicación en: http://localhost:${PORT}`);
      console.log(`ADVERTENCIA: Este proyecto contiene vulnerabilidades criticas!`);
      console.log(`Disenado exclusivamente con fines didacticos y academicos.`);
      console.log(`===========================================================`);
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la base de datos, el servidor no se pudo iniciar:', err.message);
    process.exit(1);
  });
