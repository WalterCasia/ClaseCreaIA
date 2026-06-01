const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const CLAVE_SECRETA = 'mi_secreto_super_seguro_123'; // Cambiar en producción

// 1. Simulación de base de datos (Usuarios con roles y recursos)
const usuarios = {
    "ana@email.com": { pass: "1234", rol: "admin", id: 1 },
    "juan@email.com": { pass: "abcd", rol: "user", id: 2 }
};

// 2. RUTA DE AUTENTICACIÓN (Login) - Genera el token de acceso
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios[email];

    if (!usuario || usuario.pass !== password) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // El token guarda el ID y el Rol firmados de forma segura
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, CLAVE_SECRETA, { expiresIn: '15m' });
    res.json({ mensaje: "Autenticado con éxito", token });
});

// 3. MIDDLEWARE DE VALIDACIÓN (Evita el Control de Acceso Interrumpido)
function verificarAcceso(rolRequerido) {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Formato: Bearer TOKEN

        if (!token) {
            return res.status(401).json({ error: "Acceso denegado: Falta token" });
        }

        try {
            // El servidor verifica que el token sea auténtico y no haya sido manipulado
            const datosVerificados = jwt.verify(token, CLAVE_SECRETA);
            req.usuarioLogueado = datosVerificados; // Guardamos los datos en la petición

            // Control de Acceso: Si la ruta pide un rol y el usuario no lo tiene, se bloquea
            if (rolRequerido && datosVerificados.rol !== rolRequerido) {
                return res.status(403).json({ error: "Prohibido: No tienes permisos suficientes" });
            }

            next(); // Todo en orden, pasamos a la ruta
        } catch (error) {
            res.status(403).json({ error: "Token inválido o expirado" });
        }
    };
}

// 4. RUTAS PROTEGIDAS

// Ruta accesible por cualquier usuario autenticado (User o Admin)
app.get('/api/perfil', verificarAcceso(), (req, res) => {
    res.json({ mensaje: "Bienvenido a tu perfil", datos: req.usuarioLogueado });
});

// Ruta exclusiva para Administradores (Denegar por defecto a otros)
app.get('/api/admin/dashboard', verificarAcceso('admin'), (req, res) => {
    res.json({ mensaje: "Zona secreta de administración" });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
