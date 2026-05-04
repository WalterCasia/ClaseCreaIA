-- OBTENER TODOS LOS DATOS DE LA TABLA USER Y ESTABLECER CONFICIONES SEGUN EL VALOR DE LA EDAD 
SELECT *,
CASE
    WHEN age < 18 THEN 'Menor de edad'
    WHEN age >= 18 AND age < 65 THEN 'Adulto'
    ELSE 'Mayor de edad'
END AS categoria_edad
FROM users;
