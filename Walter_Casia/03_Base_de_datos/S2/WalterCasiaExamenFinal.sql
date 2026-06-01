-- EXAMEN FINAL BASE DE DATOS 
-- PARTE 1
-- Ejercicio 1: Relación y Filtro de Grupos

SELECT departamentos.nombre AS departamento AVERAGE (empleados.salario)
FROM departamentos
JOIN empleados ON departamentos.id = empleados.dept_id
GROUP BY departamentos.nombre
HAVING AVERAGE(empleados.salario) > 3500

-- Ejercicio 2: Clasificación de Salarios

SELECT nombre, salario
CASE
    WHEN salario > 5000 THEN 'Senior'
    WHEN Salario between 3000 AND 5000 THEN 'Semi-Senior'
    WHEN salario < 3000 THEN 'Junior'
END AS 'Rango'

-- Ejercicio 3: Empleados sin Asignaciones

SELECT empleados.nombre
FROM empleados 
LEFT JOIN asignaciones ON empleados.id = asignaciones.empleado_id
WHERE asignaciones.proyecto_id IS NULL;

-- Ejercicio 4: Bonus por Productividad

SELECT empleados.nombre,
    CASE 
        WHEN SUM(asignaciones.horas) > 50 THEN empleados.salario * 0.10
        ELSE 0
    END AS Bono
FROM empleados
JOIN asignaciones ON empleados.id = asignaciones.empleado_id
GROUP BY empleados.nombre, empleados.salario;

-- Ejercicio 5: Departamentos con muchos empleados

SELECT departamentos.nombre, COUNT(empleados.id) AS cantidad_total
FROM departamentos
INNER JOIN empleados ON departamentos.id  = empleados.dept_id
GROUP BY departamentos.nombre
HAVING COUNT(Empleados.id) > 5

-- PARTE 2
-- 1 REQUERIMIENTO DE ESTRUCTURA

CREATE TABLE categorias(
    id_categoria int NOT NULL AUTO_INCREMENT,
    categoria varchar(100)
    PRIMARY KEY (id_categoria)
);

CREATE TABLE instructores(
    id_instructor int NOT NULL PRIMARY KEY,
    nombre varchar (100),
    apellido varchar (100),
    email varchar (100)
);

CREATE TABLE cursos(
    id_curso int PRIMARY KEY,
    titulo varchar (100),
    precio int,
    fecha_lanzamiento date,
    id_instructor int,
    id_categoria int,
    fecha_inscripcion date,
    FOREIGN KEY (id_instructor) REFERENCES instructores(id_instructor),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
);

CREATE TABLE estudiantes(
    id_estudiante INT PRIMARY KEY,
    nombre varchar (100),
    apellido varchar (100),
    edad int,
    fecha_registro date
);

CREATE TABLE inscripciones(
    id_inscripciones INT NOT NULL PRIMARY KEY
    id_estudiante int,
    id_curso int,
    fecha_inscripcion date,
    calificacion_final INT, check (calificacion_final between 1 and 100)
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
)

-- 2. REQUERIMIENTO DE DATOS

INSERT INTO categorias (categoria) VALUES ('Programacion');
INSERT INTO categorias (categoria) VALUES ('Matematica');
INSERT INTO categorias (categoria) VALUES ('Marketing');

INSERT INTO instructores (id_instructor, nombre, apellido, email) VALUES (1, 'Carlos', 'Agusto', 'carlosa@gmail.com');
INSERT INTO instructores (id_instructor, nombre, apellido, email) VALUES (2, 'Maria', 'Alonzo', 'malonzo@gmail.com');
INSERT INTO instructores (id_instructor, nombre, apellido, email) VALUES (3, 'Fernando', 'Falla', 'ffalla@gmail.com');

INSERT INTO cursos (id_curso, titulo, precio, fecha_lanzamiento, id_instructor, id_categoria) VALUES (1, 'Base de datos', '1000', '2021-11-15',1,1);
INSERT INTO cursos (id_curso, titulo, precio, fecha_lanzamiento, id_instructor, id_categoria) VALUES (2, 'calculo', '1500', '2025-1-20',2,2);
INSERT INTO cursos (id_curso, titulo, precio, fecha_lanzamiento, id_instructor, id_categoria) VALUES (3, 'Ventas', '250', '2020-2-15',2,3);
INSERT INTO cursos (id_curso, titulo, precio, fecha_lanzamiento, id_instructor, id_categoria) VALUES (4, 'Aritmetica', '800', '2020-10-5',1,2);
INSERT INTO cursos (id_curso, titulo, precio, fecha_lanzamiento, id_instructor, id_categoria) VALUES (5, 'Java', '1562', '2024-8-15',3,1);

INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (1, 'Carlos', 'Martínez', 20, '2024-01-10');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (2, 'Elena', 'Rodríguez', 22, '2024-01-12');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (3, 'Luis', 'Sánchez', 19, '2024-01-15');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (4, 'Sofía', 'López', 21, '2024-01-15');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (5, 'Diego', 'Gómez', 23, '2024-01-18');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (6, 'Lucía', 'Fernández', 20, '2024-01-20');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (7, 'Andrés', 'Pérez', 25, '2024-01-22');
INSERT INTO estudiantes (id_estudiante, nombre, apellido, edad, fecha_registro) VALUES (8, 'Valeria', 'Torres', 22, '2024-01-25');


INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (1, 1, '2024-03-01', 85);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (2, 1, '2024-03-01', 90);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (3, 1, '2024-03-02', 75);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (1, 2, '2024-03-05', 95);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (2, 2, '2024-03-06', 88);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (3, 2, '2024-03-07', 82);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (1, 3, '2024-03-10', 80);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (2, 3, '2024-03-11', 77);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (1, 4, '2024-03-15', 90);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (2, 4, '2024-03-16', 84);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (3, 5, '2024-03-20', 89);
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES (1, 5, '2024-03-21', 93);

-- 3. Requerimientos de Consulta (Lectura y Joins)

-- 1. Reporte de Catálogo
SELECT cursos.titulo, cat.nombre AS categoria, CONCAT(instructores.nombre, ' ', instructores.apellido) AS instructor
FROM cursos 
JOIN categorias ON cursos.id_categoria = id_categoria
JOIN instructores ON cursos.id_instructor = instructores.id_instructor;

-- 2. Estudiantes por Curso
SELECT cursos.titulo, estudiantes.nombre, estudiantes.apellido
FROM cursos
JOIN inscripciones ON id_curso = inscripciones.id_curso
JOIN estudiantes ON inscripciones.id_estudiante = id_estudiante
WHERE cursos.titulo = 'Base de datos'

-- 3. Contabilidad: 

SELECT c.titulo, (c.precio * COUNT(ins.id_estudiante)) AS total_ingresos
FROM cursos c
LEFT JOIN inscripciones ins ON c.id_curso = ins.id_curso
GROUP BY c.id_curso, c.titulo, c.precio;

-- 4. Rendimiento Académico:
SELECT e.nombre, AVG(ins.calificacion) AS promedio
FROM estudiantes e
JOIN inscripciones ins ON e.id_estudiante = ins.id_estudiante
GROUP BY e.id_estudiante, e.nombre
HAVING AVG(ins.calificacion) > 70;

