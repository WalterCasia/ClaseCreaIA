const libros = [
  { id: 1, titulo: "El Quijote",          disponible: true  },
  { id: 2, titulo: "Cien años de soledad", disponible: false },
  { id: 3, titulo: "1984",                disponible: true  },
  { id: 4, titulo: "El principito",       disponible: false },
  { id: 5, titulo: "Sapiens",             disponible: true  },
];

function obtenerLibrosServidor(callback) {
  setTimeout(() => {
    const fallo = Math.random() < 0.2;

    if (fallo)
      return callback(new Error("El servidor no responde"), null);

    callback(null, libros);
  }, 2000);
}

function filtrarDisponibles(lista, criterio) {
  let resultado = [];

  lista.forEach(libro => {
    if (criterio(libro)) {
      resultado.push(libro);
    }
  });

  return resultado;
}

obtenerLibrosServidor((err, librosRecibidos) => {
  if (err)
    return console.log("Error:", err.message);

  const disponibles = filtrarDisponibles(
    librosRecibidos,
    libro => libro.disponible === true
  );

  console.log("Libros disponibles:");
  disponibles.forEach(libro => console.log("-", libro.titulo));
});