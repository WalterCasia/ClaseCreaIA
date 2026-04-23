from base import Pokemon
import random

class PokemonAgua(Pokemon):

    def atacar(self, oponente):
        costo_ataque = 15
        dano_base = 15

        if self.energia_actual < costo_ataque: #CALCULA EL SI CUENTA CON ENERGIA NECESARIA
            print("No tienes suficiente EP")
            return
        
        self.energia_actual -= costo_ataque
        print(f"{self.nombre} usa un ataque de Agua!")

        if isinstance(oponente, PokemonFuego): #EL USO DE ISINSTANDE FUE EXPLICADO CON IA
             dano = dano_base * 2
             print("aplica el doble de daño")
        else:
            dano = dano_base * 1
            print("daño normal")

        if oponente.en_defensa is True:#SI EL OPONENTE ESTA EN DEFENSA DIVIDE DANO EN 2
            dano = dano / 2
            oponente.en_defensa = False

        oponente.hp_actual -= dano #RESTA EL DANO AL OPONENTE
        print(f"El oponente recibe {dano} puntos de daño")


class PokemonFuego(Pokemon):

    def atacar(self, oponente):
        costo_ataque = 15
        dano_base = 15

        if self.energia_actual < costo_ataque:
            print ("No tiene suficiente EP")
            return
        
        self.energia_actual -= costo_ataque
        print(f"{self.nombre} usa un ataque de fuego!")

        if isinstance (oponente, PokemonPlanta):
            dano = dano_base * 2
            print("se aplica daño doble")
        else:
            dano = dano_base * 1
            print("Daño normal")

        if oponente.en_defensa == True:
            dano = dano / 2
            oponente.en_defensa = False
            print("Defensa de oponente activa se reduce el dano a la mitad")
        
        oponente.hp_actual -= dano
        print(f"Oponente recibe {dano} puntos de dano")

class PokemonPlanta(Pokemon):

    def atacar(self, oponente):
        costo_ataque = 15
        dano_base = 15

        if self.energia_actual < costo_ataque:
            print ("No tiene suficiente EP")
            return
        
        else:
            self.energia_actual -= costo_ataque
            print(f"{self.nombre} usa un ataque de planta!")

        if isinstance (oponente, PokemonAgua):
            dano = dano_base * 2
            print("se aplica daño doble")
        else:
            dano = dano_base * 1
            print("Daño normal")

        if oponente.en_defensa == True:
            dano = dano / 2
            oponente.en_defensa = False
        
        oponente.hp_actual -= dano
        print(f"Oponente recibe {dano} puntos de dano")

class PokemonElectrico(Pokemon):

    def atacar(self, oponente):
        costo_ataque = 15
        dano_base = 15
        probabilidad_paralisis = 0.20 #SE DEFINE EL 20% DE PROBABILIDAD

        if self.energia_actual < costo_ataque:
            print("No tiene suficiente EP")
            return
        
        self.energia_actual -= costo_ataque
        print(f"{self.nombre} usa un ataque electrico!")

        dano = dano_base * 1

        if oponente.en_defensa == True:
            dano = dano / 2
            oponente.en_defensa = False
            print("El oponente estaba defendiendo, se reduce el dano a la mitad")

        oponente.hp_actual -= dano

        numero_random = random.random() #SE CONSULTA CON IA EL USO DE RANDOM GENERA UN NUEMRO DECIMAL ALEATORIO EN TRE 00.0 Y 1.0
        if numero_random < probabilidad_paralisis:
            oponente.esta_paralizado = True
            print(f"{oponente.nombre} ha sido paralizado")