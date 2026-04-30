-- cotar los resultados limitando cual es el criterio de seleccion

    -- que datoa queremos
    -- de que tabla
    -- bajo que condiciones

SELECT * FROM user WHERE age > 30;

SELECT *
FROM user
WHERE age > 30;

-- igual =
-- diferente != o <>
--mayor >
-- menor <

-- solo nombre con la tabla de usuario con la edad igual a 25
SELECT name 
FROM user
WHERE age >= 20;

-- solo nombre de la tabala user que tenga un email que termine en gmail.com

SELCT DISTINCT name, user_id, age
FROM user
WHERE age > 45