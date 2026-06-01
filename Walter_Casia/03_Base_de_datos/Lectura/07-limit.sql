-- Limita la cantidad de resultados que quiero obtener 

SELECT * 
FROM users
LIMIT 3;

-- obtener  las dos primeras filas del email distinto a WALTERCASIA

SELECT * 
FROM user 
WHERE NOT email = 'waltercasia171@gamil.com' and age = '15'
LIMIT 3;