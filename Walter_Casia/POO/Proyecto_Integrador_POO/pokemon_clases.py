from main import Pokemon
from pokedex import CATALOGO_POKEMON
from main import Jugador

class PokemonAgua(Pokemon):
    def ataque(self, tipo ):
        if tipo == "Fuego":
            pass


class PokemonFuego(Pokemon):
    def __init__(self):
        pass

class PokemonPlanta(Pokemon):
    def __init__(self):
        pass

class PokemonElectrico(Pokemon):
    def __init__(self):
        pass


def crear_pokemon(pokemon_elegido):
    if CATALOGO_POKEMON[pokemon_elegido]["tipo"] == "Fuego":
        return PokemonFuego ()
    elif CATALOGO_POKEMON[pokemon_elegido]["tipo"] == "Agua":
        return PokemonAgua ()
    elif CATALOGO_POKEMON[pokemon_elegido]["tipo"] == "Planta":
        return PokemonPlanta ()
    elif CATALOGO_POKEMON[pokemon_elegido]["tipo"] == "Electrico":
        return PokemonElectrico ()
