############################################################
#Reto Integrador 1: Centro de Control de Drones “SkyWatch” #
############################################################

class DronVigilancia:
    def __init__(self, nombre, modelo ):
        self.nombre = nombre
        self.modelo = modelo
        self.bateria = 100
        self.estado_vuelo="En Tierra"

    def despegar(self):
        if dron1.bateria >= 25 and dron1.estado_vuelo == "En Tierra":
            dron1.estado_vuelo = "En vuelo"
            print(f"El estado de vuelo ha cambiado a {dron1.estado_vuelo}.")
        elif dron1.estado_vuelo == "En vuelo":
            print("El dron ya se encuentra en el aire")
        else:
            print(f"El porcentaje de la bateria es demasiado bajo, no es posible voldar")

    def patrullar(self):
        if dron1.estado_vuelo == "En vuelo" and dron1.bateria > 10:
            print("Bateria suficiente. Se procede a patrullaje.")
            dron1.bateria = dron1.bateria - 30
            print(f"La bateria restante es {dron1.bateria}")
        elif dron1.estado_vuelo == "En Tierra":
            print("El dron se encuentra en tierra, tienes que despegar primero ")
        else:
            print("Bateria insuficiente. no se puede realizar patrullaje.")
            dron1.estado_vuelo = "En Tierra"
            print(f"Se procede a aterrizaje de dron. Estatus de vuelo cambiando a {dron1.estado_vuelo}")

    def recargar (self):
            if dron1.estado_vuelo == "En Tierra":
                print("Recargando dron....")
                dron1.bateria = 100
            else:
                print("El dron debe estar en Tierra para poder recargarlo")


print(">>> INICIANDO SISTEMA SKYWACH <<<")
nombre_dron = input("Ingrese el nombre del dron: ")
modelo_dron = input("Ingrese el modelo del dron: ")

dron1 = DronVigilancia(nombre_dron, modelo_dron)

print(f" >>> ESTADO ACTUAL: {nombre_dron} [{modelo_dron}] <<< ")
print(f" >>> Batería: {dron1.bateria}% | Estado: {dron1.estado_vuelo} <<<")

while True:
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