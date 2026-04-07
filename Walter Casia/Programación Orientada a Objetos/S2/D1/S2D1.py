'''
class LibroFisico:
    def __init__(self, titulo, autor, precio):
        self.titulo = titulo
        self.autor = autor
        self.precio = precio
        self.disponible = True

    def prestar(self):
        if self.disponible:
            self.disponible = False
            print(f"El libro '{self.titulo}' ha sido prestado.")
        else:
            print(f"El libro '{self.titulo}' no está disponible.")

Libro1 = LibroFisico("El Principito", "Antoine de Saint-Exupéry", 50.00)
Libro2 = LibroFisico("Cien Años de Soledad", "Gabriel García Márquez", 2.5)

print(Libro1.titulo)
print(Libro2.titulo)
'''

## Reto 2

class AireAcondicionado:
    def __init__ (self, temperatura=24):
        self.temperatura = temperatura

    def bajar_temperatura(self, grados):
        if self.temperatura - grados >= 16:
            self.temperatura = self.temperatura - grados
            print(f"La temperatura actual es: {self.temperatura}.")
        else:
            print("Error no puedes bajar la temperatura a menos de 16 grados")

aire1 = AireAcondicionado()
aire1.bajar_temperatura(5)
aire1.bajar_temperatura(9)
aire1.bajar_temperatura(5)
aire1.bajar_temperatura(3)