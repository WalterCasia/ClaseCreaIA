#Ejercicio Parctico 3: Gestion de Flota y control de capacidad

class Camion:
    pass

class CentroLogistico:
    pass

camion1 = Camion()
camion2 = Camion()
camion3 = Camion()
camion4 = Camion()
camion5 = Camion()

garage_principal = [camion1, camion2, camion3, camion4, camion5]

total_camiones = len(garage_principal)
impuesto_tota = total_camiones * 500

for camion in garage_principal:
    print(id(camion))

if total_camiones > 4:
    print("!Capacidad excedida! Debes mover camiones a otra sucursal.")
else:
    print ("Capacidad óptima")