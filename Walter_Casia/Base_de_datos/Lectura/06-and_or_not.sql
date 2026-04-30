-- NOT
-- AND
-- OR

SELECT * 
FROM user 
WHERE NOT email = 'waltercasia171@gamil.com'

-- todos los usuarios con email distinto a waltercasia@gmail.com y que sean mayores a 15

SELECT * 
FROM user 
WHERE NOT email = 'waltercasia171@gamil.com' and age = '15'