# Laboratorio Academico de Inyeccion SQL (SQLi Lab)

Este laboratorio interactivo ha sido desarrollado para estudiantes de ingenieria y profesionales en seguridad informatica en el marco de la asignatura de Desarrollo Seguro. El objetivo principal es experimentar de forma practica como se explotan y como se mitigan los diferentes vectores de inyeccion SQL (SQLi) utilizando un entorno local completamente controlado.

El laboratorio posee un sistema de gamificacion progresivo donde cada reto desbloquea el siguiente al completarse con exito. Cada unidad incluye fundamentos teoricos detallados, un reto de explotacion practica, un editor de codigo interactivo y una validacion automatica de las defensas.

---

## 1. Requisitos del Sistema

Para ejecutar el laboratorio en tu computadora local, necesitas los siguientes componentes:

* **Node.js:** Version 16.x o superior.
* **npm:** Gestor de paquetes de Node (incluido con Node.js).
* **MySQL Server:** Version 8.x o compatible, configurado en tu puerto local (por defecto `3306`).
* **Git:** Para clonar el repositorio de manera local.

---

## 2. Instalacion y Configuracion Local

Sigue estos pasos ordenados para desplegar el laboratorio en tu entorno de desarrollo local:

### Paso 1: Clonar el Repositorio
Abre tu terminal y ejecuta el comando de clonacion en la ruta que desees:
```bash
git clone https://github.com/DiegoOrozco/lab-sql-injection.git
cd lab-sql-injection
```

### Paso 2: Configurar las Variables de Entorno
Crea un archivo llamado `.env` en la raiz del proyecto con las credenciales de conexion a tu base de datos MySQL local:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_de_root
DB_NAME=aprendiendo_sql
PORT=3000
```
*Nota: Si la base de datos `aprendiendo_sql` no existe en tu motor MySQL local, el propio servidor la creara de forma automatica al iniciar.*

### Paso 3: Instalar Dependencias del Servidor
Instala los paquetes necesarios definidos en el archivo `package.json`:
```bash
npm install
```

### Paso 4: Levantar el Servidor del Laboratorio
Inicia la aplicacion de Node:
```bash
npm run dev
```
El servidor estara escuchando en: `http://localhost:3000` (si el puerto `3000` esta ocupado, el servidor detectara la colision y cambiara de forma automatica al puerto `3001` o superior).

---

## 3. Descripcion Detallada de las Unidades Academicas

El laboratorio se compone de 6 unidades progresivas que cubren desde los conceptos iniciales hasta inyecciones avanzadas de escritura:

### Unidad 1: Bypass de Autenticacion (Login Bypass)
* **El Problema:** La consulta de inicio de sesion concatena directamente las entradas del usuario en un string SQL.
* **Explotacion:** Uso de comillas simples (`'`) para romper el string de delimitacion y el caracter numeral (`#`) para comentar e ignorar la validacion de la contraseña.
* **Mitigacion:** Implementacion de consultas parametrizadas (Prepared Statements) en Node.js mediante el pool de conexiones.

### Unidad 2: Inyeccion SQL Basada en Uniones (UNION-based)
* **El Problema:** Un buscador de productos concatena los strings ingresados, permitiendo ejecutar multiples sentencias SELECT en paralelo.
* **Explotacion:** Uso del comando `UNION` para adjuntar los resultados confidenciales de la tabla `users` (contraseñas y notas secretas) a la busqueda publica de productos.
* **Mitigacion:** Parametrizacion correcta de filtros de coincidencia parcial (`LIKE`) inyectando los comodines `%` como argumentos y no dentro de la query.

### Unidad 3: Inyeccion SQL Basada en Errores (Error-based)
* **El Problema:** El endpoint de perfiles concatena directamente los IDs y expone los mensajes de error internos de MySQL al usuario.
* **Explotacion:** Provocar un fallo intencional en el motor mediante funciones especiales como `ExtractValue`, forzando a que la base de datos devuelva informacion confidencial dentro del propio texto de la excepcion.
* **Mitigacion:** Conversion estricta de variables de entrada a enteros mediante `parseInt()` o su parametrizacion segura.

### Unidad 4: Inyeccion SQL Ciega Booleana (Boolean Blind)
* **El Problema:** La aplicacion no muestra errores del sistema ni pinta resultados en la pantalla, pero se comporta de forma diferente si la query retorna registros (Verdadero) o vacia (Falso).
* **Explotacion:** Inyeccion de comparaciones logicas binarias (`AND 1=1` y `AND 1=2`) para inferir el estado de la base de datos y extraer contraseñas caracter por caracter.
* **Mitigacion:** Parametrizacion limpia de las clausulas `WHERE` numericas.

### Unidad 5: Inyeccion SQL Ciega Basada en Tiempo (Time-based)
* **El Problema:** La interfaz reacciona exactamente de la misma manera ante entradas verdaderas o falsas, no dejando rastro visual de la vulnerabilidad en el HTML.
* **Explotacion:** Inyeccion de instrucciones condicionales de retardo en el motor de base de datos (`SLEEP(3)`). Si el servidor tarda exactamente 3 segundos en responder, se confirma e infiere la informacion.
* **Mitigacion:** Parametrizacion robusta para detener la evaluacion de funciones de suspension temporal de consultas.

### Unidad 6: Inyeccion SQL en Modificacion (UPDATE)
* **El Problema:** Consultas de actualizacion de datos (`UPDATE`) concatenan strings directamente dentro de la edicion del perfil.
* **Explotacion:** Romper las comillas simples en el area de actualizacion de biografia para inyectar comas y reescribir otras columnas de la tabla (por ejemplo, escalar el rol de `student` a `administrator`).
* **Mitigacion:** Sentencias preparadas completas parametrizando tanto el ID del registro como el buffer de datos a guardar.

---

## 4. Consola de Pruebas y Base de Datos (Sandbox)

Al final de los retos, tendras acceso a la **Consola Sandbox**, una herramienta interactiva diseñada para que puedas:
1. Escribir e introducir comandos SQL de manera directa en tu base de datos local para verificar el estado de las tablas (`SELECT * FROM users;`).
2. Practicar consultas avanzadas e inserciones manuales.
3. **Restablecer BD:** En caso de que alteres o elimines informacion de forma destructiva, el boton rojo de restablecimiento reiniciara todas las tablas, esquemas e indices a su estado inicial en menos de un segundo de forma segura y automatica.

---

## 5. Licencia y Buenas Practicas

Este software ha sido diseñado con fines estrictamente academicos de investigacion y enseñanza en desarrollo seguro. Queda prohibido el uso de las tecnicas explicadas en sistemas informaticos ajenos sin la debida autorizacion por escrito.
