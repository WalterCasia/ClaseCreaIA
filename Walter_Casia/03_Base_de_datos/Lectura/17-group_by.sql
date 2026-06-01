-- agrupa filas que tiene los mismos valores o una o mas columnas,  y luego pued aplicar funciones de agregacon a cada grupo para obtener 

-- obtener la cantidad de usuaris por cada edad
SELECT age, COUNT(*) AS total_personas
FROM user
GROUP BY age;

--cuantas personas tiene el mismo nombre
SELECT name, COUNT(*) as mismo_nombre
FROM user
GROUP BY name