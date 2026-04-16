import random
from pokedex import CATALOGO_POKEMON

class Pokemon:
    def __init__(self, nombre, hp_maximo, energia_maxima, tipo):
        self.nombre = nombre
        self.__hp_actual = hp_maximo
        self.__hp_maximo = hp_maximo
        self.__energia_actual = energia_maxima
        self.__energia_maxima = energia_maxima
        self.tipo = tipo


    @property
    def hp_maximo(self):
        return self.__hp_maximo
    
    @property
    def hp_actual(self):
        return self.__hp_actual
    
    @property
    def energia_actual(self):
        return self.__energia_actual
    
    @property
    def energia_maxima(self):
        return self.__energia_maxima
    
    @hp_maximo.setter
    def hp_maximo(self, valor):
        hp_maximo = valor


#########################################################
class Jugador:
    def __init__(self, nombre):
        self.nombre = nombre

    def obtener_datos_pokemon(numero_pokemon):
        pokemon_elegido = CATALOGO_POKEMON.get(numero_pokemon - 1)
        print(pokemon_elegido)


##############################################################
print("Seleccione el Modo de Juego: ")
print("1. Jugador vs Jugador")
print("2. Jugador vz Computadora")
opcion_modo_juego = input("Seleccione el modo de juego: ")

while True:
    if opcion_modo_juego == 1:
        print("Modo de juego seleccionado PvP!!!")
        mostrar_catalogo_disponible()
        nombre_juagador_1 = input("Jugador 1, como deberia llamarte: ")
        numero_pokemon_j1 = int(input(f"{nombre_juagador_1}, Elija el numero de su Pokemon: "))
        print(f"!Has seleccionado a {nombre_pokemon_j1}")
        nombre_juagador_2 = input("Jugador 2, como deberia llamarte: ")
        numero_pokemon_j2 = int(input(f"{nombre_juagador_2}, Elija el numero de su Pokemon: "))
        print(f"!Has seleccionado a {nombre_pokemon_j2}")
        print("!COMIENZA LA BATALLA!")
        print(f"{nombre_pokemon_j1} {tipo}")

