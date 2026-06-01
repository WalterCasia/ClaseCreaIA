-- Relacion 1:1
-- un usuario se relaciona solo con un dni

CREATE TABLE dni(
    dni_id INT AUTO_INCREMENT,
    dni_number INT NOT NULL,
    user_id INT,
    PRIMARY KEY (dni_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
)

-- Relacion 1:n (uno a muchos)
-- un registro de la tabala a puede tener varios registros de la tabla b 
-- pero un registro de la tabla b se relaciona solo con un objeto

CREATE TABLE companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
)

ALTER TABLE user
ADD company_id INT;
-- convertir a foreign key
ADD CONSTRAINT fk_companies
FOREIGN KEY (company_id) REFERENCES companies(company_id);

-- Relacion n:n (muchos a muchos)
-- Relacion tanto la tabla A como la B puedes tener varios registros relacionados 

CREATE TABLE lenguajes(
    lenguaje_id INT AUTO_INCREMENT PRIMARY KEY
    name VARCHAR(100) NOT NULL
)

CREATE TABLE user_lenguajes(
    user_lenguajes_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT.
    lenguaje_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (lenguaje_id) REFERENCES lenguajes(lenguaje_id
    UNIQUE (user_id, lenguaje_id))
)