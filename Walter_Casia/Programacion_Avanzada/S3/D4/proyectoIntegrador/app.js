const express = require('express');
const dotenv = require('dotenv');
const formRouter = require('./routes/rutas');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/form', formRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
