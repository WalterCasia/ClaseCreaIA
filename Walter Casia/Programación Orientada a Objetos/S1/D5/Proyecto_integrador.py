############################################################
#Reto Integrador 1: Centro de Control de Drones “SkyWatch” #
############################################################

class DronVigilancia:
    def __init__(self, nombre, modelo, bateria=100, estado_vuelo="En Tierra"):
        self.nombre = nombre
        self.modelo = modelo
        self.bateria = bateria
        self.estado = estado_vuelo


print(">>> INICIANDO SISTEMA SKYWACH <<<")
nombre_dron = input("Ingrese el nombre del dron: ")
modelo_dron = input("Ingrese el modelo del dron: ")

dron_1 = DronVigilancia(nombre_dron, modelo_dron)

print(f" --- ESTADO ACTUAL: {nombre_dron} [{modelo_dron}] --- ")
print(f"Batería: {dron_1.self.bateria()} | Estado: {dron_1.self.estado_vuelo()}")

while True:
    