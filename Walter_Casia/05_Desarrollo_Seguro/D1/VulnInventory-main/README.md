# VulnInventory (Vulnerable by Design)

Este repositorio ha sido diseñado como un entorno educativo vulnerable por diseño para el curso de Desarrollo Seguro. El objetivo es que los estudiantes auditen el codigo, identifiquen las fallas de seguridad, las exploten de forma controlada y propongan las correcciones necesarias.

---

## Requisitos Previos
*   Node.js (v16+) instalado.
*   Servidor local MySQL encendido.
*   Python 3 instalado.

---

## Instrucciones de Inicio Rapido

Para poner en marcha todo el proyecto, unicamente debes seguir estos pasos desde la terminal de tu computadora:

1. Abre tu terminal en la carpeta principal del proyecto (donde clonaste el repositorio).
2. Ejecuta el comando de inicio automatico:
   ```bash
   npm run dev
   ```
   *Este comando instalara de forma automatica las dependencias del backend, verificara la base de datos MySQL local, creara las tablas requeridas con los datos semilla correspondientes e iniciara el servidor de desarrollo.*

3. Abre en tu navegador de preferencia la siguiente direccion:
   ```
   http://localhost:3000
   ```

*Nota: Si tu base de datos local utiliza un usuario o contraseña diferente al de los valores por defecto del proyecto, puedes modificar directamente el archivo de configuracion en `backend/.env`.*

### Credenciales de Acceso por Defecto (Base de Datos Semilla)
Para explorar la aplicacion normalmente antes de auditar el codigo, puedes iniciar sesion con cualquiera de las siguientes cuentas pre-registradas en la base de datos:

*   **Administrador:**
    *   Usuario: `admin`
    *   Contraseña: `admin123`
*   **Usuario Diego:**
    *   Usuario: `diego`
    *   Contraseña: `diego777`
*   **Usuario Maria:**
    *   Usuario: `maria`
    *   Contraseña: `secretpass`


---

## Objetivos de Aprendizaje

Al finalizar la auditoria, explotacion y correccion de este proyecto, habras desarrollado habilidades practicas en:

*   **Gestion de Configuraciones y Secretos:** Comprender como estructurar archivos de entorno sensibles y los riesgos asociados a exponer credenciales activas en repositorios publicos.
*   **Seguridad en Consultas a Bases de Datos:** Identificar como se producen las inyecciones de codigo SQL y como mitigar este riesgo de raiz utilizando consultas parametrizadas y estructuras de datos preparadas.
*   **Sanitizacion de Entradas e Interfaces Web:** Evaluar el impacto de la inyeccion de scripts maliciosos en la capa del cliente (XSS) y aprender a neutralizar etiquetas HTML y JavaScript mediante metodos de renderizado seguro y desinfeccion.
*   **Validacion de Autorizaciones a Nivel de Recurso:** Analizar e implementar controles de acceso estrictos en las APIs para evitar la manipulacion no autorizada de recursos ajenos (IDOR) y accesos no validados a rutas de administrador.
*   **Ejecucion Segura de Procesos a Nivel de Sistema Operativo:** Entender las implicaciones de invocar interpretes de comandos del sistema desde scripts de automatizacion y como reescribir estas llamadas de manera hermetica y segura.

---

## Descargo de Responsabilidad (Disclaimer)
Este software es proporcionado exclusivamente con fines educativos. La explotacion de sistemas informaticos sin autorizacion es ilegal. El autor no se hace responsable del mal uso de este codigo.
