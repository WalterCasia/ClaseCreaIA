-- Database initialization script
CREATE DATABASE IF NOT EXISTS aprendiendo_sql;
USE aprendiendo_sql;

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;

-- Users table (Vulnerable: Plaintext/MD5 passwords, exposed roles)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Intentionally plain-text or MD5 for Day 1
    role VARCHAR(20) NOT NULL DEFAULT 'user'
);

-- Inventory items table (Vulnerable: Description allows stored HTML/XSS, items linked to specific users)
CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT, -- Vulnerable to Stored XSS
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed data for testing SQL Injection, XSS, and IDOR
-- Passwords: 
-- admin -> admin123
-- diego -> diego777
-- maria -> secretpass
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'admin'),
('diego', 'diego777', 'user'),
('maria', 'secretpass', 'user');

-- Seed inventory items
-- Admin items, Diego's items, Maria's items
INSERT INTO inventory (name, description, quantity, price, user_id) VALUES
('Laptop HP ProBook', 'Procesador Intel i5, 16GB RAM, 512GB SSD. Asignada a soporte.', 5, 850.00, 1),
('Monitor Dell 27"', 'Monitor ultra-wide de 27 pulgadas, resolución 2K.', 10, 320.00, 1),
('Teclado Mecánico', 'Teclado mecánico retroiluminado RGB, interruptores Red.', 15, 75.00, 2),
('Mouse Ergonómico', 'Mouse inalámbrico vertical con soporte de muñeca.', 20, 45.00, 2),
('Servidor NAS Synology', 'Servidor de almacenamiento en red 4-Bay, backups internos.', 2, 600.00, 3),
('Cable HDMI 2m', 'Cable HDMI alta velocidad con soporte para 4K.', 50, 12.50, 3);
