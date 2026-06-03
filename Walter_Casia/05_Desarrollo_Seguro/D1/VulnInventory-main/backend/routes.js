const express = require('express');
const router = express.Router();
const db = require('./db');

// --- Seccion de Autenticacion ---

/**
 * @route   POST /api/auth/login
 * @desc    Logs in a user
 * @access  Public
 * @note    Revisar el comportamiento y seguridad de esta funcion de inicio de sesion.
 */
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Ejecucion de consulta
  const query = `SELECT id, username, role FROM users WHERE username = '${username}' AND password = '${password}'`;

  try {
    const users = await db.queryRaw(query);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];
    
    // Simplificacion extrema: El "token" es simplemente el ID del usuario en texto plano
    const fakeToken = user.id.toString();

    res.json({
      message: 'Login exitoso',
      token: fakeToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor al iniciar sesión', details: err.message });
  }
});


// --- Seccion de Inventario ---

/**
 * @route   GET /api/inventory
 * @desc    Get all inventory items
 * @access  Private
 * @note    Revisar la validacion de permisos y el filtrado de recursos por usuario.
 */
router.get('/inventory', async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Falta cabecera de autorización' });
  }

  try {
    // El token es simplemente el ID del usuario en texto plano
    const loggedUserId = parseInt(authHeader);
    
    // Si envian un user_id en la consulta, lo usamos; de lo contrario el del usuario logueado
    const targetUserId = req.query.user_id || loggedUserId;
    
    // Carga de articulos
    const query = `SELECT i.*, u.username as owner FROM inventory i JOIN users u ON i.user_id = u.id WHERE i.user_id = ${targetUserId}`;
    const items = await db.queryRaw(query);
    res.json(items);
  } catch (err) {
    res.status(401).json({ error: 'Sesión no válida o error al listar', details: err.message });
  }
});

/**
 * @route   GET /api/inventory/search
 * @desc    Search inventory items
 * @access  Public
 * @note    Revisar el comportamiento de las busquedas en la base de datos.
 */
router.get('/inventory/search', async (req, res) => {
  const searchTerm = req.query.q || '';

  // Ejecucion de busqueda
  const query = `SELECT i.*, u.username as owner FROM inventory i JOIN users u ON i.user_id = u.id WHERE i.name LIKE '%${searchTerm}%' OR i.description LIKE '%${searchTerm}%'`;

  try {
    const items = await db.queryRaw(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error al realizar la búsqueda', details: err.message });
  }
});

/**
 * @route   GET /api/inventory/:id
 * @desc    Get a single inventory item details
 * @access  Private
 * @note    Revisar el acceso a registros individuales.
 */
router.get('/inventory/:id', async (req, res) => {
  const itemId = req.params.id;
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Falta autorización' });
  }

  try {
    const query = `SELECT * FROM inventory WHERE id = ${itemId}`;
    const items = await db.queryRaw(query);

    if (items.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    res.json(items[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor', details: err.message });
  }
});

/**
 * @route   POST /api/inventory
 * @desc    Create a new inventory item
 * @access  Private
 * @note    Revisar la insercion de datos y la desinfeccion de campos.
 */
router.post('/inventory', async (req, res) => {
  const { name, description, quantity, price } = req.body;
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Falta cabecera de autorización' });
  }

  try {
    const loggedUserId = parseInt(authHeader);
    
    if (!name || quantity === undefined || price === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos (nombre, cantidad, precio)' });
    }

    // Insercion de datos vinculando el usuario autenticado
    const query = `INSERT INTO inventory (name, description, quantity, price, user_id) VALUES ('${name}', '${description}', ${quantity}, ${price}, ${loggedUserId})`;
    const result = await db.queryRaw(query);

    res.status(201).json({ message: 'Artículo creado exitosamente', itemId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar artículo', details: err.message });
  }
});

/**
 * @route   DELETE /api/inventory/:id
 * @desc    Delete an inventory item
 * @access  Private
 * @note    Revisar la seguridad del proceso de eliminacion de registros.
 */
router.delete('/inventory/:id', async (req, res) => {
  const itemId = req.params.id;
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Falta autorización' });
  }

  try {
    // Operacion de borrado
    const query = `DELETE FROM inventory WHERE id = ${itemId}`;
    await db.queryRaw(query);

    res.json({ message: `Artículo #${itemId} eliminado exitosamente` });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor al eliminar', details: err.message });
  }
});


// --- Seccion de Administracion ---

/**
 * @route   GET /api/users
 * @desc    Get all users list (for admin dashboard)
 * @access  Admin-only
 * @note    Revisar la proteccion de esta ruta y de las credenciales de usuarios.
 */
router.get('/users', async (req, res) => {
  try {
    const query = `SELECT id, username, password, role FROM users`;
    const users = await db.queryRaw(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor', details: err.message });
  }
});

module.exports = router;
