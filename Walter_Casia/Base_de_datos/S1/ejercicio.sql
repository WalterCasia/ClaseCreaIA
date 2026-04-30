-- SELECCION DE FILTROS

SELECT name  
FROM productos;

SELECT DISTINCT categoria
FROM productos;

SELECT nombre, precio
FROM productos
WHERE categoria = 'Electrónica' AND precio > 100

-- ORDEN Y LOGICA

SELECT *
FROM productos
ORDER BY precio DESC;

SELECT *
FROM productos
WHERE nombre LIKE '%pro%'
ORRDER BY stock;

SELECT *
FROM productos
WHERE not categoria = 'Mobiliario' AND precio BETWEEN 50 AND 500
ORDER BY nombre;

-- LIMITES Y NULOS

SELECT *
FROM productos
LIMIT 3;

SELECT *
FROM productos
WHERE proveedor_id IS NULL

SELECT MAX(precio)
FROM productos
WHERE categoria = 'Electronica'


-- AGREGACIONES 

SELECT COUNT(*) AS total_productos
FROM productos;

SELECT AVG(precio) AS promedio
FROM productos
WHERE categoria = 'Hogar';

SELECT nombre, SUM(precio * stock) AS promedio
FROM productos
WHERE NOT proveedor_id IS NULL
GROUP BY nombre;

