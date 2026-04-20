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


###Modelo
class Libro:
    def __init__(self, titulo, autor, ID):
        self.titulo = titulo
        self.autor = autor
        self.id = ID
        self.prestado = True

    @staticmethod
    def cambio_estado():
        if Libro.prestado == True:
            