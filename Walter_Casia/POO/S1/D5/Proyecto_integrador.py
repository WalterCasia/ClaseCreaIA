############################################################
#Reto Integrador 1: Centro de Control de Drones “SkyWatch” #
############################################################
'''
class DronVigilancia:
    def __init__(self, nombre, modelo ):
        self.nombre = nombre
        self.modelo = modelo
        self.bateria = 100
        self.estado_vuelo="En Tierra"

    def despegar(self):
        if self.bateria >= 25 and self.estado_vuelo == "En Tierra":
            self.estado_vuelo = "En vuelo"
            print("¡Despegue exitoso! El dron ahora está en el aire.")
        elif self.estado_vuelo == "En vuelo":
            print("El dron ya se encuentra en el aire")
        else:
            print(f"El porcentaje de la bateria es demasiado bajo, no es posible voldar")

    def patrullar(self):
        if self.estado_vuelo == "En vuelo" and self.bateria >= 30 :
            self.bateria = self.bateria - 30
            print(f"Patrullaje completado. Consumo: 30%. Batería restante: {self.bateria}%.")
            if self.bateria < 10:
                self.estado_vuelo = "En Tierra"
                print("¡Alerta! Batería en nivel crítico. Se procede a aterrizaje de emergencia.")
        elif self.estado_vuelo == "En Tierra":
            print("El dron se encuentra en tierra, tienes que despegar primero ")
        else:
            print("Bateria insuficiente. no se puede realizar patrullaje.")
            self.estado_vuelo = "En Tierra"
            print("Se procede a aterrizaje de dron.")

    def recargar (self):
            if self.estado_vuelo == "En Tierra" and self.bateria < 100:
                print("Recargando dron......")
                self.bateria = 100
                print("Bateria recargada exitosamente.")
            elif self.bateria == 100:
                print("La bateria ya se encuentra al 100%.")    
            else:
                print("El dron debe estar en Tierra para poder recargarlo")


print(">>> INICIANDO SISTEMA SKYWACH <<<")
nombre_dron = input("Ingrese el nombre del dron: ")
modelo_dron = input("Ingrese el modelo del dron: ")

dron1 = DronVigilancia(nombre_dron, modelo_dron)

while True:
    print(f"\n >>> ESTADO ACTUAL: {nombre_dron} [{modelo_dron}] <<< ")
    print(f" >>> Batería: {dron1.bateria}% | Estado: {dron1.estado_vuelo} <<< \n")
    opcion = int(input("Que accion deseas realizar?  (1. Despegar / 2. Patrullar / 3. Recargar / 4. Salir) : "))
    if opcion == 1:
        dron1.despegar()
    elif opcion == 2:
        dron1.patrullar()
    elif opcion == 3:
        dron1.recargar()
    elif opcion == 4:
        print("Saliendo del programa.")
        break
    else:
        print("Ingrese una opcion valida")
'''

############################################################
## Reto Integrador 2: Sistema de Bio-Ingeniería “Ares-1” ##
############################################################

class PlantaEspacial:
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie
        self.hidratacion = 100
        self.salud = 100
        self.estado = "Saludable"

    def regar(self):
        if self.hidratacion < 100:
            self.hidratacion += 15
            print(f"Suministrando agua... Hidratación actual: {self.hidratacion}")
        else:
            print("La planta ya esta al 100% de su hidratacion")

    def paso_tiempo(self):
        self.hidratacion -= 20
        print(f"Ha pasado un día en Marte. La hidratación bajó a {self.hidratacion}%")
        if self.hidratacion < 30:
            self.salud -= 40
            print("¡ALERTA! Hidratación crítica. La salud de Cronos ha sufrido daños.")
    
    def diagnostico_vida(self):
        if self.salud <= 0:
            self.estado = "Marchita"
            self.salud = 0
            self.hidratacion = 0

print(">>> INICIANDO SISTEMA DE BIO-INGENIERÍA ARES-1 <<<")
nombre_planta = input("Nombre de la planta: ")
especie = input("Especie de la planta: ")

planta1 = PlantaEspacial(nombre_planta, especie)

while True:
    print(f"\n >>> REPORTE DE BIO-MONITOR: {nombre_planta} <<< ")
    print(f" >>> Estado: {planta1.estado} | Hidratacion: {planta1.hidratacion} | Salud: {planta1.salud} <<< \n")
    opcion = int(input("¿Qué acción desea realizar? (1. Regar / 2. Dejar pasar día / 3. Salir): "))

    if opcion == 1:
        planta1.regar()
    elif opcion == 2:
        planta1.paso_tiempo()
        planta1.diagnostico_vida()
    elif opcion == 3:
        print("Has salido del programa.")
        break
    else:
        print("Ingresa una opcion valida.")
        


