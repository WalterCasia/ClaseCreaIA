class SensorPresion:
    total_lecturas = 0
    LIMITE_PELIGRO = 200 #DEFINICION DE VARIABLES GLOBALES

    def __init__(self, nombre, presion ):
        self.__presion = presion
        self.nombre = nombre
        SensorPresion.total_lecturas += 1 #INCIO DEL OBJETO DESFICION DE ATRIBUTOS Y SUMA DE LECTURAS

    @property
    def presion (self):
        return self.__presion #LECTURA DE LA VARIABLE GLOBAL

    @presion.setter
    def presion (self, new_presion):
        if new_presion >= 0:
            self.__presion = new_presion
        else:
            print("El valor ingresado es menor a 0.") #MODIFICACION DE ATRIBUTO PRIVADO 

    def estado(self):
        if self.presion >= 0 and self.presion < 200:
            return "SEGURO"
        else:
            return "!PELIGRO!" # VALDIACION DE ESTADO DE CALDERA


print("\n >>> SISTEMA DE MONITOREO INDUSTRIAL <<<")
print("Leyendo resgistros de presion ... \n")

with open ("registros.txt", "r" ) as archivo:
    alertados = []
    while True:
        try:
            linea_nombre = archivo.readline().strip()
            linea_presion = archivo.readline().strip()
            linea_presion = int(linea_presion)
            meidicion = SensorPresion(linea_nombre, linea_presion) # CREACION DE OBEJETOS A PARTIR DE DOS DATOS QUE SE OBTIENEN DEL ARCHIVO DE TECTO QUE ES EL NOMBRE DE CALDERA Y PRESION Y SE VALDIA SI ESTA EN PEGRO 
            meidicion.presion = linea_presion
            if meidicion.estado() == "!PELIGRO!":
                alertados.append(linea_nombre)
            if linea_nombre == "" and linea_presion == "" :
                break
            print(f"Analizando: {meidicion.nombre} | Estado: {meidicion.estado()} ")
        except:
            break
            
with open ("alertas.txt", "w") as alertas:
    alertas.write("REPORTE DE INCIDENCIAS - CALDERAS CRITICAS")
    alertas.write("\n------------------------------------------")
    contador = 0
    for datos in alertados:
        alertas.write(f"\n{contador+1}. {alertados[contador]}")
        contador += 1

print("\n[AUDITORIA] Se han generado alertas en el archivo 'alertas.txt'")
print(f"[RESUMEN] Total de sensores procesados: {SensorPresion.total_lecturas}")
print("---------------------------------------")
