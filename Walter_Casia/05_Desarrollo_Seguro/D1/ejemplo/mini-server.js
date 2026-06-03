require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// Endpoint de LOGIN (Generador del token)
app.post('/login', (req, res) => {
    // Simulamos que el usuario 1 es el admin
    const user = { id: 1, role: 'admin' };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware (El portero)
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <token>
    
    if (!token) return res.status(403).send('No hay token');
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('¡Token inválido o manipulado!');
    }
};

// Ruta protegida
app.get('/datos-secretos', auth, (req, res) => {
    res.send(`Bienvenido, tu ID es ${req.user.id}`);
});

app.listen(3000, () => console.log('Servidor demo en puerto 3000'));