

class Pokemon: #CLASE ABSTRACTA QUE FUNCIONA PARA MOLDE DE LOS TIPOS DE POKEMOSNES
    def __init__(self, nombre, hp_maximo, energia_maxima):
        self.nombre = nombre
        self.__hp_actual = hp_maximo
        self.__hp_maximo = hp_maximo
        self.__energia_actual = energia_maxima
        self.__energia_maxima = energia_maxima
        self.paralizado = False
        self.en_defensa = False

    @property
    def hp_actual(self):
        return self.__hp_actual
    
    @property
    def hp_maximo(self):
        return self.__hp_maximo
    
    @property
    def energia_actual(self):
        return self.__energia_actual
    
    @property
    def energia_maxima(self):
        return self.__energia_maxima
    
    @hp_actual.setter
    def hp_actual (self, valor):
        if valor < 0:
            self.__hp_actual = 0
        elif valor > self.hp_maximo:
            self.__hp_actual = self.hp_maximo
        else:
            self.__hp_actual = valor

    @energia_actual.setter
    def energia_actual (self, valor):
        if valor < 0:
            self.__energia_actual = 0
        elif valor > self.__energia_maxima:
            self.__energia_actual = self.__energia_maxima
        else:
            self.__energia_actual = valor

    def esta_vivo(self): #INDICA SI POKEMON AUN CUENTA CON VIDA MAYOR A 0
        return self.__hp_actual > 0

    def defender(self): #CALCULA EL COSTO DE DEFENSA Y LO ACTIVA 
        costo_defensa = 5
        if self.energia_actual >= costo_defensa:
            self.energia_actual -= costo_defensa
            self.en_defensa = True
            print(f"{self.nombre} se pone en posicion defensiva")
        else:
            print("No tienes suficiencente EP para defender")

    def descansar(self): #CALCULA EL COSTO DE DESCANSO Y LO ACTIVA
        restauracion = 20
        self.energia_actual += restauracion
        print(f"{self.nombre} descansa y recupera {restauracion}")

    def atacar (self, oponente): #FUNCION OBLIGATORIA EN CLASES
        pass
