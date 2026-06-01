CREATE DATABASE estacion_aethelgard;
USE estacion_aethelgard; 

CREATE TABLE flota(
    id int,
    nombre varchar(100),
    clase varchar(50),
    energia int,
    escudo int,
    PRIMARY KEY (id)
);

INSERT INTO flota VALUES (1, 'Centinela-X', 'Combate', 100, 100);
INSERT INTO flota VALUES (2, 'Carguero-01', 'Carga', 80, 100);
INSERT INTO flota VALUES (3, 'Titan-Alpha', 'Hibrida',90,50);


UPDATE flota SET energia = 45 WHERE nombre = 'Centinela-X';
UPDATE flota SET escudo = 100 WHERE nombre = 'Titan-Alpha';
DELETE FROM flota WHERE nombre = 'Carguero-01'