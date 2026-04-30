-- NULL 

--TODOS LOS USUARIOS CON EL CORREO NULO

SELECT *
FROM user
WHERE email IS NULL;

SELECT *
FROM user
WHERE email IS NOT NULL;

-- IFNULL
--es ua funcion que me permite reemplaxar el valor nuelo por otro que le indique
-- obtener nombre, apellido y edad de la tabla user y si la eda des nula se reeemplaza por 0

SELEC name, lastname, IFNULL(age, 0) AS age
FROM user;