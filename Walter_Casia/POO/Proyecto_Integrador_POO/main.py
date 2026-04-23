import random
import pokedex
from pokemon_clases import PokemonPlanta, PokemonFuego, PokemonAgua, PokemonElectrico
from base import Pokemon  #SE UTILIZO IA PARA PODER SOLUCIONAR UN PRBLEMA DE IMPORTACION DE CLASES CCREANDO UN NUEVO ARCHIVO BASE

#########################################################
def crear_pokemon(numero_pokemon):#SE EXTRAEN LOS DATOS DE LA POKEDEX Y SE INSTANCIA LA CLASE HIJA
    datos = pokedex.CATALOGO_POKEMON[numero_pokemon]
    tipo = datos["tipo"]

    if tipo == "Fuego":
        return PokemonFuego(datos["nombre"], datos["hp_maximo"], datos["energia_maxima"])
    elif tipo == "Agua":
        return PokemonAgua(datos["nombre"], datos["hp_maximo"], datos["energia_maxima"])
    elif tipo == "Planta":
        return PokemonPlanta(datos["nombre"], datos["hp_maximo"], datos["energia_maxima"])
    elif tipo == "Electrico":
        return PokemonElectrico(datos["nombre"], datos["hp_maximo"], datos["energia_maxima"])

    

def elegir_pokemon(jugador):
    
    while True:
        if jugador == "Jugador 1" or jugador == "Jugador 2":
            opcion = input(f"{jugador} Ingrese el pokemon que desea elegir: ")
            return crear_pokemon(opcion)
        elif jugador == "bot":
            numero_random = random.randint(1, len(pokedex.CATALOGO_POKEMON))#RANDINT SE UTILIZA IA PARA SER EXPLICADO 
            return crear_pokemon(str(numero_random))


def pedir_accion(pokemon):#RETORNA LA ACCION ELEGIDA DE PELEA
    print(f"TURNO DE {pokemon.nombre}")
    print(f"[HP {pokemon.hp_actual}/{pokemon.hp_maximo}] | [EP: {pokemon.energia_actual}/{pokemon.energia_maxima}]")
    print("1. Atacar (Costo: 15 EP)\n2. Defender (coato: 5 EP)\n3. Decansar (Restaurar: 20 EP)")
    while True:
        try:
            opcion = int(input("> Opcion: "))
            if opcion in (1, 2, 3):
                return opcion
            else:
                print("Ingrese una opcion valida.")
        except:
            print("Ingrese solo numeros del 1 al 3")

def accion_bot(pokemon):
    opcion = random.randint(1, 3) #RETORNA CON UN NUM ALEATORIO LA OPCION DE COMPU
    print(f"\nTURNO DE {pokemon.nombre} (Computadora)")
    print(f"[HP: {pokemon.hp_actual}/{pokemon.hp_maximo}] | [EP: {pokemon.energia_actual}/{pokemon.energia_maxima}]")
    print(f"La computadora elige: {opcion}")
    return opcion

def ejecutar_accion(accion, atacante, defensor):#SE INSTANCIA LA ACCION DE QUIEN VIENE Y A AQUIEN VA 
    if accion == 1:
        atacante.atacar(defensor)
    elif accion == 2:
        atacante.defender()
    elif accion == 3:
        atacante.descansar()

def turno(pokemon, bot, oponente):#SE DEFINE EL TURNO EN SI UN SOLO TURNO
    if pokemon.paralizado == True: 
        print(f"{pokemon.nombre} esta paralizado, pierde su turno")
        pokemon.paralizado = False
        return
    if bot: #SI ES BOT QUE LE GENERE ACCION QUE SE GENERE ALEATORIAMENTE
        accion = accion_bot(pokemon)
    else:
        accion = pedir_accion(pokemon)
    
    ejecutar_accion(accion,pokemon, oponente)

def batalla(pokemon1, pokemon2, modo): #CICLO DE BATALLA
    print("!COMIENZA LA BATALLA!")
    print(f"{pokemon1.nombre} vs {pokemon2.nombre}")

    while pokemon1.esta_vivo() and pokemon2.esta_vivo():

        turno(pokemon1, bot=False, oponente=pokemon2)
        if not pokemon2.esta_vivo():
            break

        if modo == "PvE":
            turno(pokemon2, bot=True, oponente=pokemon1)
        else:
            turno(pokemon2, bot=False, oponente=pokemon1)

        if not pokemon1.esta_vivo():
            break

    if pokemon1.esta_vivo():
        print(f"{pokemon1.nombre} gana la batalla")
    else:
        print(f"{pokemon2.nombre} gana la batalla")

##############################################################
print("=" * 40)
print("SIMULADOR DE BATALLAS POKEMON (POO)")
print("=" * 40)
print("\nSeleccione el Modo de Juego: ")
print("1. Jugador vs Jugador")
print("2. Jugador vz Computadora")

while True:
    try:
        opcion_modo_juego = int(input("> Opcion: "))
    except:
        print("Ingrese una opcion valida")

    pokedex.mostrar_catalogo_disponible()
    pokemon1 = elegir_pokemon("Jugador 1")
    print(f"Has seleccionado a {pokemon1.nombre}\n")

    if opcion_modo_juego == 2:
        print("Bot eligiendo contrincante.")
        pokemon2 = elegir_pokemon("bot")
        print(f"El bot eligio a {pokemon2.nombre}\n")
        batalla(pokemon1, pokemon2, modo="PvE")
    else:
        pokemon2 = elegir_pokemon("Jugador 2")
        print(f"{pokemon2.nombre} listo!")
        batalla(pokemon1, pokemon2, modo="PvP")
                
            
                

