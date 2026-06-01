
'''
import random as rd

class SableDeLuz:
    def __init__(self):
        self.energia = 100
    def recargar (self, recarga = 10):
        self.energia = self.energia + recarga
    def __sub__(self, nueva_energia):
        sable_elegido = rd.choice([self.energia, nueva_energia])
        return SableDeLuz(sable_elegido - 10)
        
sable_rojo = SableDeLuz ()
sable_azul = SableDeLuz ()

#######################
##EJERCICIO 2 ########
######################

from abc import ABC, abstractmethod

class Trabjador(ABC):

    @abstractmethod
    def realizar_tarea():
        pass

class Ingeniero(Trabjador):
    def realizar_tarea():
        print("Hascer calculos")

class Medico(Trabjador):
    def realizar_tarea():
        pass
'''

#############################
#######EJERCIO 3 ###########

from abc import ABC, abstractmethod

class VehiculoTerrestre:
    @abstractmethod
    def conducir_ruedas(self):
        pass

class VehiculoAcuatico:
    @abstractmethod
    def encender_helices(self):
        pass

class VehiculoAnfibio(VehiculoAcuatico, VehiculoTerrestre):
    
    def conducir_ruedas(self):
        print("Activando traccion 4x4 en terreno rocoso")

    def encender_helices(self):
        print("Retrayendo ruedas y activcando propulsion acuatica")

class AutoComun(VehiculoTerrestre):
    def conducir_ruedas(self):
        print("Encenciendo engranaje")

class Lancha(VehiculoAcuatico):
    def encender_helices(self):
        print("Encendiendo helices")


mi_lancha = Lancha()
mi_carro = AutoComun()
mi_anfibio = VehiculoAnfibio()

ruta_terrestre = [mi_carro, mi_anfibio]

for vehiculo in ruta_terrestre:
    vehiculo.conducir_ruedas()

ruta_acuatica = [mi_lancha, mi_anfibio]

for vehiculo in ruta_acuatica:
    vehiculo.encender_helices()
