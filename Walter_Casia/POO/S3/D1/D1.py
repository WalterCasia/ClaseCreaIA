class PersonajeBase:
    def caminar(self):
        print("El personaje está avanzando por el mapa")
    def descansar(self):
        print("El personaje está recuperando energía")

class Mago(PersonajeBase):
    def lanzar_hechizo(self):
        print("!El mago lanza una bola de fuego!")

class Guerrero(PersonajeBase):
    def bloquear_ataque(self):
        print("!El guerrero levanta su escudo de metal!")

mi_mago = Mago()
mi_guerrero = Guerrero()
mi_mago.caminar()
mi_guerrero.caminar()
mi_mago.descansar()
mi_guerrero.descansar()
mi_mago.lanzar_hechizo()
mi_guerrero.bloquear_ataque()
#mi_guerrero.lanzar_hechizo()

##########################################
## Ejercicio # 2

class Registrar_Vehiculos:
    Total_registros = 0
    Tarifa_base = 1.26

    def __init__ (self, placa, marca, modelo):
        self.placa = placa
        self.marca = marca
        self.modelo = modelo
        self._kilometraje = 0
        self.estado = "Disponible"
        Total_registros += 1


    def registro(self):
        print(f"Se han registrado {self.Total_registros} vehiculos en total.")

    def estado_vehiculo (self):
        if self.estado == "Disponible":
            print("El vehiculo se puede alquilar!!")
            self.estado = "Alquilado"
        elif self.estado == "Alquilado":
            print("El vehiculo esta en uso se debe devolver.")
        else:
            print("ERROR")

    def costo_alquiler(self):
        total = self._kilometraje * self.Tarifa_base
        print(f"El costo de alquiler es {total}.")

    def act_tarifa (self):
        nueva_tarifa = input("Ingrese la nueva tarifa: ")
        Registrar_Vehiculos.Tarifa_base  = nueva_tarifa
