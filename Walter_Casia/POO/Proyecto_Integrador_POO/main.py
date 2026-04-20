import random
import pokedex
import pokemon_clases


class Pokemon:
    def __init__(self, nombre, hp_maximo, energia_maxima, tipo):
        self.nombre = nombre
        self.__hp_actual = hp_maximo
        self.__hp_maximo = hp_maximo
        self.__energia_actual = energia_maxima
        self.__energia_maxima = energia_maxima
        self.tipo = tipo

################# Modo de juego  
    def seleccionar_pokemon(jugador):
        pokedex.mostrar_catalogo_disponible
        while True:
            try:
                numero_pokemon = int(input("Elija el numero de su Pokemon: "))
                pokemon_elegido = pokedex.CATALOGO_POKEMON.get(numero_pokemon - 1)
                return (pokemon_clases.crear_pokemon(pokemon_elegido))
                break
            except:
                print("[ERROR] Ingrese un numero de pokemon valido.")
    
    def pedir_acciones():
        print("Que accion deseas realiar?\n 1. Atacar (Costo: 15 EP)\n 2. Defender (Costo: 5 EP)\n 3. Descansar (Restaura: 20 EP)")
        while True:
            try:
                accion_elegida = input("> Opcion: ")
                if accion_elegida in (1, 2, 3):
                    return accion_elegida
            except:
                print("[ERROR] Ingrese un numero de opcion valida")
    
    def accion_bot():
        return random.randint(1,3)
        
######################
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


################modo combate #################################
print("Seleccione el Modo de Juego: ")
print("1. Jugador vs Jugador")
print("2. Jugador vz Computadora")
try:
    opcion_modo_juego = int(input("Seleccione el modo de juego: "))
except:
    input("[ERROR] Ingresa un numero de opcion valida")

pokemon_j1 = Pokemon.seleccionar_pokemon("jugador_1")

if opcion_modo_juego == 1:
    print("Modo de juego seleccionado PvP!!!")
    pokemon_j2 = Pokemon.seleccionar_pokemon("jugador_2")
        
        