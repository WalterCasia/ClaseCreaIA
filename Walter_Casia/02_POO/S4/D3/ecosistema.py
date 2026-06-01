from abc import ABC, abstractmethod

class EntidadBase(ABC):
    lista_entidades = []
    def __init__(self, energia):
        self.energia = energia

    @abstractmethod
    def alimentarse(energia):
        pass

    def __add__(self, otro ):
        return self + otro
    
    def iniciar_ciclo_vital(self, lista_entidades):
        for entidad in lista_entidades:
            self.alimentarse(entidad)

class Sintetizador(EntidadBase):
    def alimentarse(cantidad=10):
        energia = energia + cantidad

class Consumidor(EntidadBase):
    pass

class Hibrido(Sintetizador, Consumidor):
    pass

def crear_entidad(entidad_elegida,  energia_ini):
    if entidad_elegida == 1:
        Sintetizador(energia_ini)
    elif entidad_elegida == 2:
        Consumidor(energia_ini)


############################################
print("=" * 45)
print("Sistema de gestion de energias")
print("=" * 45)

while True:
    try:
        print("Ingrese e tipo de entidad que desea crear: ")
        print("1. Sintetisador\n2. Hibrido")
        entidad_elegida = int(input("Opcion > "))
        if entidad_elegida in (1, 2):
            energia_inicial = int(input("Ingrese la energia inicial: "))
            crear_entidad(entidad_elegida, energia_inicial)
        else:
            print("Ingrese una opcion valida:")
    except:
        print("Ingrese un dato tipo numero")