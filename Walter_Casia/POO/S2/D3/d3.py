## Ejercicio 
'''
class Empleado:
    def __init__(self ):
        self.__salario = 300

    @property
    def salario(self):
        return self.__salario
    
    @salario.setter
    def salario (self, salario_nuevo):
        if salario_nuevo > 300:
            self.__salario = self.__salario + salario_nuevo
            print(self.__salario)
        else:
            print ("No se aceptan salarios menoes a 300")

salario1 = Empleado()
print(salario1.salario)
salario1.salario = 50


class TermostatoDigital:
    def __init__(self):
        self.__temperatura = 0
        self.status_termostato = True

    @property
    def temperatura (self):
        return self.__temperatura
    
    @temperatura.setter
    def temperatura (self, nueva_temperatura):
        if nueva_temperatura > 0:
            self.__temperatura = nueva_temperatura
            print(f"La nueva temperatura es {self.__temperatura}")
        else:
            print("Solo puedes ingresar temperatura mayores a 0")

medicion1 = TermostatoDigital()

print(">>> TERMOSTATO DIGITAL <<<")
print("Opciones:")
print("1. Validar la temperatura actual.")
print("2. Modificar el valor de la temperatura.")
print("3. Salir.")

while True:
    try:
        opcion = int(input("Ingrese que opcion desea elegir: "))
        if opcion == 1:
            print (f"La temperatura actual es de {medicion1.temperatura}.")
        elif opcion == 2:
            nueva_temp = input("Ingrese la nueva temperatura deseada mayor a 0:")
            medicion1.temperatura = int(nueva_temp)
        elif opcion == 3:
            print("Saliedo del programa. Adios")
            break
        else:
            print("Ingrese una opcion correcta")
    except:
        print("Ingrese un valor numerico valido.")

## El atributo se protege colocandolo de manera privada dentro ed la clase __temperatura
## Cuando se consulta la temperatura @property habilita una ventana de ingreso para obtener la informacion de la variable privada
## Con la propiedad setter se da acceso a la propiedad privada y se le ingresa un dato nueva por que sea modificado 
## Se tiene el condicional if el cual determina coforme a parametros como se manejan los datos

'''
'''
class Tienda:
    impuesto_iva = 0.13
    def __init__(self, productos):
        self.__productos = productos

    @classmethod
    def cambiar_impuesto(cls, nuevo_impuesto):
        cls.impuesto_iva = nuevo_impuesto

Tienda.cambiar_impuesto(0.15)

'''
'''
class RegistroVisitantes:
    total_personas=0
    def __init__(self, nombre_visitante):
        self.nombre=nombre_visitante
        RegistroVisitantes.total_personas+=1
        
        print(f"{self.nombre} ha ingresado. La pizarra global ahora marca : {RegistroVisitantes.total_personas} ")


persona1=RegistroVisitantes("Maria")
persona2= RegistroVisitantes("Carlos")
persona3=RegistroVisitantes("Julian")
print(f"\nTotal final del dia de personas es: {RegistroVisitantes.total_personas}")


class EmpleadoTienda:

    sueldo_minimo_legal = 300
    cantidad_empleado = 0

    def __init__(self, nombre, id_empleado):
        self.nombre = nombre
        self.id = id_empleado

        EmpleadoTienda.cantidad_empleado += 1

    @classmethod
    def aumento_nacional(cls, nuevo_salario):
        cls.sueldo_minimo_legal = nuevo_salario

        print("\n[COMUNICADO OFICIAL] El gobierno ha cambiado el sueldo minimo")

    def mostrar_recibos(self):
        print(f"Empleadp {self.id}: {self.nombre} | Pago a recibir: {EmpleadoTienda.sueldo_minimo_legal}")

    
print("\n >>> SITEMA DE PLANILLA NACIONAL <<<")

trabajador1 = EmpleadoTienda("Juan", 1)
trabajador2 = EmpleadoTienda("Luis", 2)

print(f"Total de empleados: {EmpleadoTienda.cantidad_empleado}")

EmpleadoTienda.aumento_nacional(500)

trabajador1.mostrar_recibos()
trabajador2.mostrar_recibos()
'''
'''
 Reto integrador
 Actúas como el Arquitecto de Software en jefe. Debes programar el núcleo lógico de un Banco.

**Instrucciones**

1. Crea la clase `CuentaBancaria`.
2. **Atributos Compartidos**
    * El banco maneja una `tasa_interes_global` que nace en `0.05`
    * El banco lleva un registro de `total_cuentas_creadas` que nace en `0`.
3. **El Constructor**
    * Pide un parámetro: `nombre_titular`.
    * Crea el atributo privado `__titular` usando el parámetro.   
    * Crea el atributo privado `__saldo` e inicialízalo por defecto en `0.0`.
    * Súmale 1 al atributo de clase `total_cuentas_creadas`
4. **Seguridad**
    * Crea un `@property` llamado `saldo` que actúe como Getter 
      * **OJO:** No hagas el Setter para el saldo, el saldo no se debe poder sobrescribir con un `=`, solo debe cambiar mediante depósitos y retiros.
    * Crea un `@property` llamado `titular` (Getter).
    * Crea su respectivo `@titular.setter`. La validación debe asegurar que el nombre no esté en blanco
5. **Métodos de Instancia**
    * Crea un método `depositar(self, cantidad)`. Si la cantidad es mayor a 0, súmala al saldo 
    * Crea un método `retirar(self, cantidad)`. Solo permite el retiro si hay suficiente dinero en la cuenta.
    * Crea un método `proyectar_interes(self)`. Este método debe multiplicar el saldo privado actual por la `tasa_interes_global` de la clase e imprimir cuánto dinero ganará el cliente este *año*.
6. **Método de Clase:**
    * Crea un `@classmethod` llamado `modificar_tasa_interes(cls, nueva_tasa)`. Este método debe actualizar la tasa global del banco.
**Simulación en el programa principal:**
* Crea dos cuentas 
* Imprime cuántas cuentas existen a nivel global.
* Deposítale 10,000 a cuenta1
* Proyecta el interés de cuenta1 con la tasa actual del 5%
* Usa el método de clase para que el Banco suba la tasa de interés a 0.10 (10%).
* Vuelve a proyectar el interés de cuenta1 para ver cómo la ganancia se duplicó automáticamente.
* Intenta cambiar el nombre de Sofía a un texto en blanco `""` para comprobar que el setter la bloquea.

'''

class CuentaBancaria:
    tasa_interes_global = 0.05
    total_cuentas_creadas = 0

    def __init__(self, nombre_titular):
        self.__titular = nombre_titular
        self.__saldo = 0.0
        CuentaBancaria.total_cuentas_creadas += 1

    @property
    def saldo (self):
        return self.__saldo
    @property
    def titular (self):
        return self.__titular
    
    @titular.setter
    def titular (self, nombre_titular):
        if nombre_titular == "":
            print("Ingresa el nombre, no dejes el espacio en blanco")
        else:
            self.__titular = nombre_titular

    def depositar(self, cantidad):
        if cantidad > 0:
            self.__saldo = cantidad
            print(f"El saldo ha cambiado el saldo actual es: {self.__saldo}")
        else:
            print("Ingrese un saldo mayor a 0:")

    def retirar(self, cantidad):
        if cantidad <= self.__saldo and cantidad >= 0:
            self.__saldo -= cantidad
            print(f"El saldo ha cambiado el saldo actual es: {self.__saldo}")
        else:
            print("El saldo el mayor al saldo en tu cuenta.")

    def proyectar_intereses (self):
        intereses = self.__saldo * self.tasa_interes_global
        print(f"El cliente ganara {intereses} en inteses al ano.")

    @classmethod
    def modificar_tasa_interes(cls, nueva_tasa):
        cls.tasa_interes_global = nueva_tasa 


cuenta1 = CuentaBancaria("Walter")
cuenta2 = CuentaBancaria("Emily")

print(f"El numero de cuentas creadas en el banco es de: {CuentaBancaria.total_cuentas_creadas}")
cuenta1.depositar(10000)
cuenta1.proyectar_intereses()
CuentaBancaria.modificar_tasa_interes(0.10)
cuenta1.proyectar_intereses()
print(cuenta1.titular)
cuenta1.titular = ""