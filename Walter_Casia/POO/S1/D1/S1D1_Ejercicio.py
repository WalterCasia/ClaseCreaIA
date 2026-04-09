#Ejercicio Practico 3: Gestion de Flota y control de capacidad

class Camion:
    pass

class CentroLogistico:
    pass

camion1 = Camion()
camion2 = Camion()
camion3 = Camion()
camion4 = Camion()
camion5 = Camion()

garaje_principal = [camion1, camion2, camion3, camion4, camion5]

total_camiones = len(garaje_principal)
impuesto_total = total_camiones * 500

for camion in garaje_principal:
    print(id(camion))

if total_camiones > 4:
    print("¡Capacidad excedida! Debes mover camiones a otra sucursal.")
else:
    print ("Capacidad óptima")