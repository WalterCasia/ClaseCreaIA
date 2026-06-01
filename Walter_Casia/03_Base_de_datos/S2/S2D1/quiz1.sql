-- QUIZ 
--EJERCICIO 1
SELECT nombre, proyecto_actual AS Nombre_del_Proyecto
FROM empleados_proyectos
WHERE proyecto_actual IS NOT NULL AND departamento = 'IT' AND salario > 3800
ORDER BY salario DESC;

--EJERCICIO 2
SELECT departamento, AVG(horas_semanales) AS Promedio_Horas
FROM empleados_proyectos
GROUP BY departamento HAVING AVG(horas_semanales) > 30;