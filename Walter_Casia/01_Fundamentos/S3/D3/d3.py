##################################
#####   Frutas en el inventario   #####
inventario = [
    [10, 4, 8],
    [5, 12, 3],
    [7,20, 6]
]
frutas_totales = 0
for estantes in inventario:
    for producto in estantes:
        if producto > 5 and (producto % 2 == 0):
            frutas_totales += producto
print(f"El total de las frutas es: {frutas_totales} en el inventario.")
####################################
#####   EJERCICIO # 2 ##############
####################################

precios_pasillos = [
    [10.0, 55.0, 20.0],
    [45.0, 80.0, 12.0],
    [100.0, 30.0, 48.0]
]

incremento = 0.10

for pasillo in range (len(precios_pasillos)):
    for precio in range (len(precios_pasillos[pasillo])):
        if precios_pasillos[pasillo][precio] < 50:
            precios_pasillos[pasillo][precio] = (precios_pasillos[pasillo][precio] * incremento) + precios_pasillos[pasillo][precio]

print(precios_pasillos)

#######################################################################       

for pasillo in range (len(precios_pasillos)):
    for precio in range (len(precios_pasillos[pasillo])):
        if precios_pasillos[pasillo][precio] < 50:
            precios_pasillos[pasillo][precio] = (precios_pasillos[pasillo][precio] * incremento) + precios_pasillos[pasillo][precio]

print(precios_pasillos)