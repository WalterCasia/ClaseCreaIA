'''
#Molde aaun vacio para la clase producto 
class producto():
    pass

#Fabricar dos obejotos fisicos e independientes 

articulo_1 = producto()
articulo_2 = producto()

# les vamos a asignar caracteristicas a cada uno
# sintaxis: objeto.atributo = valor

articulo_1.nombre = "Camiseta"
articulo_1.precio = 19.99
articulo_1.cantidad = 10

articulo_2.nombre = "Pantalon"
articulo_2.precio = 29.99
articulo_2.cantidad = 5

print(articulo_1.nombre)
print(articulo_1.precio)
print(articulo_1.cantidad)

print(articulo_2.nombre)
print(articulo_2.precio)
print(articulo_2.cantidad)

#Ejercicios

class Empleado():
    pass

empleado_1 = Empleado()
empleado_2 = Empleado()
empleado_3 = Empleado()

empleado_1.nombre = "Walter"
empleado_1.cargo = "Gerente"
empleado_1.salario = 1000

empleado_2.nombre = "Juan"
empleado_2.cargo = "Cajero"
empleado_2.salario = 500

empleado_3.nombre = "Maria"
empleado_3.cargo = "Bodeguero"
empleado_3.salario = 400

print(f"Nombre: {empleado_1.nombre}, Cargo: {empleado_1.cargo}, Salario: {empleado_1.salario}")
print(f"Nombre: {empleado_2.nombre}, Cargo: {empleado_2.cargo}, Salario: {empleado_2.salario}")
print(f"Nombre: {empleado_3.nombre}, Cargo: {empleado_3.cargo}, Salario: {empleado_3.salario}")

'''
#Metodo

#self es una referencia a la instancia actual de la clase
#es como decir "este objeto" o "este empleado"

class Empleado():
    def saludar_cliente(self):
        print(f"Hola me llamo {self.nombre}, bienvenido a nuestra tienda")

# Fabricamos nuestro objeto 

cajero = Empleado()
bodeguero = Empleado()

cajero.nombre = "Walter"
bodeguero.nombre = "Maria"

cajero.saludar_cliente()
bodeguero.saludar_cliente()