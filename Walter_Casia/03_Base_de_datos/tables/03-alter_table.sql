-- agregar un elemento a una tabla
ALTER TABLE persona8 
add telefono varchar(20);

alter table persona8
add apellido varchar(100) not null;


-- renombrar una columna
alter table persona8
rename column name to nombre;

-- modificar u tipo de dato atributo 
alter table persona8
modify column telefono int;

-- eliminar un atributo
alter table persona8
drop column apellido;