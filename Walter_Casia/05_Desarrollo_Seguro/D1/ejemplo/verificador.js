const jwt = require('jsonwebtoken');

// El atacante roba el token, pero quiere cambiar el ID a 999
const tokenInseguro = jwt.sign({ id: 99, role: 'admin' }, 'SECRETO_INCORRECTO');

console.log("Token malicioso generado por el atacante:");
console.log(tokenInseguro);