import random

class Pokemon:
    def __init__(self, nombre, hp_actual, hp_maximo, energia_actual, energia_maxima):
        self.nombre = nombre
        self.__hp_actual = hp_actual
        self.__hp_maximo = hp_maximo
        self.__energia_actual = energia_actual
        self.__energia_maxima = energia_maxima

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

