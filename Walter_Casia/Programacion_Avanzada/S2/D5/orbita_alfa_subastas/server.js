const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/subasta', (req, res) => {
    const { idLote, comerciante, oferta } = req.body;

    console.log(`[SERVIDOR] Datos recibidos. Comerciante ${comerciante} | Monto ofertado: ${oferta} por el lote ${idLote}`);

    const consultaLote = new Promise((resolve, reject) => {
        db.query('SELECT * FROM lotes WHERE id = ?', [idLote], (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado);
        });
    });

    const consultaComerciante = new Promise((resolve, reject) => {
        db.query('SELECT * FROM comerciantes WHERE nombre = ?', [comerciante], (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado);
        });
    });

    Promise.all([consultaLote, consultaComerciante])
        .then(([resultadoLotes, resultadoComerciantes]) => {
            
            if (resultadoLotes.length === 0 || resultadoComerciantes.length === 0) {
                return res.send('El ID del lote o el comerciante no existe en el sistema.');
            }

            const lote = resultadoLotes[0];
            const comercianteData = resultadoComerciantes[0];

            const ofertaActual = lote.oferta;
            const creditos = comercianteData.creditos;

            if (oferta > creditos) {
                return res.send('El comerciante no cuenta con los creditos suficientes.');
            }

            if (oferta <= ofertaActual) {
                return res.send('Puja menor o igual a la oferta actual.');
            }

            const total = creditos - oferta;

            const actualizacionLote = new Promise((resolve, reject) => {
                db.query('UPDATE lotes SET oferta = ?, comerciante = ? WHERE id = ?', [oferta, comerciante, idLote], (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });

            const actualizacionComerciante = new Promise((resolve, reject) => {
                db.query('UPDATE comerciantes SET creditos = ? WHERE nombre = ?', [total, comerciante], (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });

            return Promise.all([actualizacionLote, actualizacionComerciante]);
        })
        .then(() => {
            console.log(`[BD] Registro guardado con exito.`);
            
            res.send(`
                <script>
                    alert("Operacion realizada con exito");
                </script>
            `);
        })
        .catch((err) => {
            console.error("Error critico: ", err);
            res.status(500).send("<h1>Error interno en el servidor</h1>");
        });
});

app.get('/consultar', (req, res) => {
    console.log('[SERVIDOR] peticion GET recibida. Solicitando datos del mercado...');

    const consultaLotes = new Promise((resolve, reject) => {
        db.query('SELECT * FROM lotes', (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado);
        });
    });

    const consultaComerciantes = new Promise((resolve, reject) => {
        db.query('SELECT * FROM comerciantes', (err, resultado) => {
            if (err) return reject(err);
            resolve(resultado);
        });
    });

    Promise.all([consultaLotes, consultaComerciantes])
        .then(([resultadoLotes, resultadoComerciantes]) => {
            let listaLotesHTML = '';
            let listaComerciantesHTML = '';

            resultadoLotes.forEach((lote) => {
                listaLotesHTML += `
                    <li>ID: ${lote.id} | Material: ${lote.material} | Puja Actual: ${lote.oferta} | Lider: ${lote.comerciante || 'Ninguno'}</li>
                `;
            });

            resultadoComerciantes.forEach((c) => {
                listaComerciantesHTML += `
                    <li>Comerciante: ${c.nombre} | Saldo: ${c.creditos}</li>
                `;
            });

            res.send(`
                <h2>Lotes</h2>
                <ul>
                    ${listaLotesHTML}
                </ul>

                <h2>Comerciantes</h2>
                <ul>
                    ${listaComerciantesHTML}
                </ul>
                <br>
            `);
        })
        .catch((err) => {
            console.error("Error al consultar la base de datos: ", err);
            return res.status(500).send("<h1>Error critico. No se pudo recuperar la informacion</h1>");
        });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

