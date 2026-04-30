-- cuenta cuantas filas contiene la tabla user
SELECT COUNT(*) AS total_user
FROM user;

SELECT COUNT(*) AS total_user
FROM user
WHERE email is NULL

-- cuantas final contiene un dato no nulo en el campo edad 


SELECT COUNT(*) AS total_edad
FROM user
WHERE age is NOT NULL