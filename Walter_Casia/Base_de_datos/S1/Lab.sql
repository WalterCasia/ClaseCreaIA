-- LABORATIORIO # 

-- 1. SELECT
SELECT nombre FROM productos;
SELECT nombre, precio, stock FROM productos;
SELECT * FROM productos;

-- 2. DISTINCT
SELECT DISTINCT categoria FROM productos;
SELECT DISTINCT proveedor_id FROM productos;
SELECT DISTINCT precio FROM productos;

-- 3. WHERE
SELECT * FROM productos WHERE categoria = 'Hogar';
SELECT * FROM productos WHERE precio = 1200.00;
SELECT nombre FROM productos WHERE categoria = 'Electrónica' AND stock < 10;

-- 4. ORDER BY
SELECT * FROM productos ORDER BY nombre ASC;
SELECT * FROM productos ORDER BY precio DESC;
SELECT * FROM productos ORDER BY categoria ASC, stock DESC;

-- 5. LIKE
SELECT * FROM productos WHERE nombre LIKE 'Monitor%';
SELECT * FROM productos WHERE nombre LIKE '%o';
SELECT * FROM productos WHERE nombre LIKE '%Inalámbrico%' ORDER BY precio;

-- 6. AND / OR / NOT
SELECT * FROM productos WHERE categoria = 'Electrónica' AND precio < 100;
SELECT * FROM productos WHERE categoria = 'Hogar' OR categoria = 'Mobiliario';
SELECT * FROM productos WHERE NOT categoria = 'Electrónica' AND stock > 0 ORDER BY categoria;

-- 7. LIMIT
SELECT * FROM productos LIMIT 2;
SELECT * FROM productos ORDER BY precio DESC LIMIT 5;
SELECT nombre FROM productos ORDER BY stock ASC LIMIT 1;

-- 8. NULL
SELECT * FROM productos WHERE proveedor_id IS NULL;
SELECT * FROM productos WHERE stock IS NULL;
SELECT * FROM productos WHERE proveedor_id IS NOT NULL AND stock IS NULL;

-- 9. MIN / MAX
SELECT MIN(precio) FROM productos;
SELECT MAX(precio) FROM productos WHERE categoria = 'Mobiliario';
SELECT MAX(stock) FROM productos WHERE precio < 500;

-- 10. COUNT
SELECT COUNT(*) FROM productos;
SELECT COUNT(proveedor_id) FROM productos;
SELECT COUNT(*) FROM productos WHERE categoria = 'Electrónica' AND precio > 100;

-- 11. SUM
SELECT SUM(stock) FROM productos;
SELECT SUM(precio) FROM productos WHERE categoria = 'Mobiliario';
SELECT SUM(precio * stock) FROM productos;

-- 12. AVG
SELECT AVG(precio) FROM productos;
SELECT AVG(stock) FROM productos WHERE categoria = 'Electrónica';
SELECT AVG(precio) FROM productos WHERE fecha_ingreso BETWEEN '2024-01-01' AND '2024-12-31';

-- 13. IN
SELECT * FROM productos WHERE id IN (1, 3, 5);
SELECT * FROM productos WHERE categoria IN ('Hogar', 'Electrónica');
SELECT * FROM productos WHERE proveedor_id IN (1, 2) ORDER BY nombre;

-- 14. BETWEEN
SELECT * FROM productos WHERE precio BETWEEN 50 AND 300;
SELECT * FROM productos WHERE fecha_ingreso BETWEEN '2024-01-01' AND '2024-03-31';
SELECT * FROM productos WHERE stock BETWEEN 5 AND 20 AND categoria = 'Mobiliario';

-- 15. ALIAS
SELECT nombre AS Articulo FROM productos;
SELECT precio AS Costo_Unitario FROM productos ORDER BY Costo_Unitario;
SELECT (precio * 0.13) AS Impuesto_Ventas FROM productos;

-- 16. CONCAT
SELECT CONCAT(nombre, ' - ', categoria) FROM productos;
SELECT CONCAT('El producto ', nombre, ' cuesta ', precio) FROM productos;
SELECT CONCAT(id, LEFT(categoria, 3)) FROM productos;

-- 17. GROUP BY
SELECT categoria FROM productos GROUP BY categoria;
SELECT categoria, COUNT(*) FROM productos GROUP BY categoria;
SELECT proveedor_id, MAX(precio), MIN(precio) FROM productos GROUP BY proveedor_id ORDER BY MAX(precio);

-- 18. HAVING
SELECT categoria FROM productos GROUP BY categoria HAVING COUNT(*) > 2;
SELECT categoria FROM productos GROUP BY categoria HAVING AVG(precio) > 200;
SELECT proveedor_id FROM productos WHERE stock > 0 GROUP BY proveedor_id HAVING COUNT(*) > 1 AND SUM(precio * stock) > 500;