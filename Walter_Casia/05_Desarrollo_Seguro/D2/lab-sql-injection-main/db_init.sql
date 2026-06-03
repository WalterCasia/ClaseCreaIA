-- Script para inicializar y poblar la base de datos de aprendizaje de SQL Injection

CREATE DATABASE IF NOT EXISTS aprendiendo_sql;
USE aprendiendo_sql;

-- 1. Tabla de Usuarios (para Login, Modificar Valores y Error-based/Blind SQLi)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    bio VARCHAR(255) DEFAULT 'Estudiante de desarrollo seguro',
    secret_note VARCHAR(255) DEFAULT 'Bandera Secreta: {SQL_INJECTION_EXPERT}'
);

-- 2. Tabla de Productos (para UNION-based SQLi y búsquedas)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Poblar la tabla de usuarios
INSERT IGNORE INTO users (id, username, password, role, bio, secret_note) VALUES
(1, 'admin', 'SuperSecurePassword2026!', 'administrator', 'Administrador principal del sistema académico.', 'Bandera de Administrador: {UNION_SUCCESS_FLAG_99}'),
(2, 'drozco', 'profesor123', 'teacher', 'Profesor de seguridad informática.', 'Clave de examen: El examen es el próximo martes.'),
(3, 'alumno_test', 'invitado123', 'student', 'Estudiante de prueba aprendiendo inyecciones.', 'Anotación: Me cuesta entender las ciegas basadas en tiempo.');

-- Poblar la tabla de productos
INSERT IGNORE INTO products (id, name, description, price, stock) VALUES
(1, 'Laptop Avanzada X', 'Computadora portátil ideal para desarrollo y pentesting.', 1200.00, 15),
(2, 'Teclado Mecánico RGB', 'Teclado mecánico con switches silenciosos y retroiluminación.', 89.99, 42),
(3, 'Monitor Curvo 4K 27"', 'Monitor ultra-alta definición para máxima productividad.', 349.50, 8),
(4, 'Libro: Fundamentos de Ciberseguridad', 'Guía completa desde criptografía hasta desarrollo seguro.', 45.00, 100),
(5, 'Mouse Gamer Inalámbrico', 'Mouse de alta precisión con batería recargable.', 59.99, 25);
