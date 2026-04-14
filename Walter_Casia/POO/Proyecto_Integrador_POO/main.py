class Pokemon:
    def __init__(self, nombre, hp_actual, hp_maximo, energia_actual, energia_maxima):
        self.nombre = nombre
        self.__hp_maximo = hp_maximo
        self.__energia_actual = energia_actual
        self.__energia_maxima = energia_maxima

    @property
    def hp_maximo(self):
        return self.hp_maximo
    
    @property
    def hnergia_actual(self):
        return self.nergia_actual
    
    @property
    def energia_maxima(self):
        return self.energia_maxima
    

