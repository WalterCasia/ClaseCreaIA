'''
from abc import ABC, abstractmethod

class Personaje(ABC):
    @abstractmethod
    def atacar (self):
        pass

# modelos concretos
class Guerrero(Personaje):
    def atacar():
        return "Ataca con golpe"

class Mago(Personaje):
    def atacar(): 
        return "Ataca con magia"

# La fabrica (corazon del patron)
class FabricaPersonaje:
    @staticmethod
    def crear_personaje(tipo):
        tipo = tipo.lower()

        if tipo == "guerrero":
            return Guerrero.atacar()
        elif tipo == "mago":
            return Mago.atacar()
        else:
            raise ValueError(f"La farica no sabe crear: {tipo}")

#fabrica = FabricaPersonaje()
#fabrica.crear_personaje

#personaje = FabricaPersonaje.crear_personaje("mago")

try:
    eleccion = input("Que personaje deseas: (Guerrero / Mago) ")

#el main No hace: if eleccion == "guerrero: Guerrero()
#el main Delega a la fabrica
    heroe = FabricaPersonaje.crear_personaje(eleccion)
    print(heroe)

except ValueError as error:
    print(error)

'''
###Modelo
class Libro:
    def __init__(self, titulo, autor, ID):
        self.titulo = titulo
        self.autor = autor
        self.id = ID
        self.prestado = False

    @staticmethod
    def cambio_estado():
        if Libro.prestado == True:
            Libro.prestado = False
        elif Libro.prestado == False:
            Libro.prestado = True

#Vista
class VistaBiblioteca:
    @staticmethod
    def mostrar_menu():
        print(f"[MENU DE LA BIBLIOTECA]\n 1. Anadir libro\n 2. Listar libros\n 3. Prestar libro\n 4. Salir")
        return input("Opcion: ")
    
    @staticmethod
    def obtener_datos():
        titulo = input("Ingrese el nombre del libro: ")
        autor = input("Ingrese el autr del libro: ")
        ID = input("Ingrese el ID del llibro: ")
        return titulo, autor, ID
    
    @staticmethod
    def listar_libros(biblioteca):
        print("Lista de libros en la biblioteca:")

        for libros in biblioteca:
            estado = "Prestado" if Libro.prestado else "En Stock"
            print (f"[{Libro.id}] El libro {Libro.titulo } del autor {Libro.autor} se encuenta {estado}")

    @staticmethod
    def buscar_ID():
        return input("Ingrese el ID que desea: ")

#Controlador

class ControladorBiblioteca:
    def __init__(self):
        self.libros = []
        self.vista = VistaBiblioteca()

    def ejecutar(self):
        while True:
            opcion = self.vista.mostrar_menu()
            if opcion == "1":
                titu, aut, di = self.vista.obtener_datos()
                libro = Libro(titu, aut, di)
                self.libros.append(libro)
            elif opcion == "2":
                self.vista.listar_libros(self.libros)
            elif opcion == "3":
                id = self.vista.buscar_ID()
                pass
            elif opcion == "4":
                print("Saliendo del programa")
                break
            else:
                print("Ingrese una opcion valida ")

if __name__ == "__main__":
    controlador = ControladorBiblioteca()
    controlador.ejecutar()

            