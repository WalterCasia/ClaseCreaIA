-- like significa que le damos un criterio de busqueda a la cnsulta, y nos va a traer los resultados que cumplan con ese criterio
    -- es un tipo de:
        -- contiene
        -- se parece a 
        -- empieza por
        -- 

SELECT *
FROM user
WHERE email LIKE '%@gmail.com'

SELECT DISTINCT last_name 
FROM user 

SELECT name, last_name, edad
FROM user
WHERE age > 20
ORDER BY name DES;

SELECT user_id, name 
FROM user
WHERE email LIKE '%@gmail.com' , init_date > 2022;

SELECT *
FROM user