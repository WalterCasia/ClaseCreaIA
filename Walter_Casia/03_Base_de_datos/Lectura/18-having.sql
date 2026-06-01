-- se parece al where
-- se usa para filtrar los rsultados de una consulta despues de haber agrupados los datos con group by 
-- where filtra las filas ANTES  de agrupar los datos mientras que having filtra los grupos DESPUES de ,haber  agrupado los datos

SELECT age, COUNT(*) AS total_personas
FROM user
GROUP BY age
HAVING COUNT(*) > 2;




