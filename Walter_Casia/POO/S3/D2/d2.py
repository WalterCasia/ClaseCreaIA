'''
class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio

    def __add__(self, nuevo_precio):
        return Producto(self.precio + nuevo_precio.precio)
    
    def __sub__(self, nuevo_precio):
        return Producto(self.precio - nuevo_precio.precio)
    
    def __gt__(self, nuevo_precio):
        return self.precio > nuevo_precio.precio
    
    def __str__(self):
        return f"Producto en stock: {self.nombre}, Precio producto: {self.precio} "
    
producto1 = Producto("Grafica", 1000)
producto2 = Producto("RAM", 4200)
producto3 = Producto("CPU", 152)
producto4 = Producto("Fuente de poder", 400)

stock = [producto1, producto2, producto3, producto4]

print(">>>> RESUMEN INVENTARIO <<<<<")
for pro in stock:
    print(pro)

'''
## Ejercicio # 2
import random
numero = random.randint(1, 10)
print (numero)

from random import choice

nombres = ["Carlos", "Walter", "Marcos"]
ganador = choice(nombres)
print(ganador)

import math as matematicas
resultado = matematicas.ceil(4.2)
print(resultado)
