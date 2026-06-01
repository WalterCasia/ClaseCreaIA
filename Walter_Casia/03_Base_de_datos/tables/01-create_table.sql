CREATE TABLE person1(
    id int,
    name varchar(100),
    age int,
    email varchar(50),
    fecha_nacimiento date
)

CREATE TABLE person2(
    id int NOT NULL,
    name varchar(100) NOT NULL,
    age int,
    email varchar(50),
    fecha_nacimiento date
)

CREATE TABLE person3(
    id int NOT NULL,
    name varchar(100) NOT NULL,
    age int,
    email varchar(50),
    fecha_nacimiento date
)
    UNIQUE (ID)
)

CREATE TABLE person4(
    id int NOT NULL,
    name varchar(100) NOT NULL,
    age int,
    email varchar(50),
    fecha_nacimiento date,
    UNIQUE (ID)
    PRIMARY KEY (id)
)

CREATE TABLE person5(
    id int NOT NULL,
    name varchar(100) NOT NULL,
    age int,
    email varchar(50) UNIQUE DEFAULT 'invitado@gmail.com',
    fecha_nacimiento date,
    UNIQUE (ID)
    PRIMARY KEY (id)
    CHECK (age >= 18)
)




