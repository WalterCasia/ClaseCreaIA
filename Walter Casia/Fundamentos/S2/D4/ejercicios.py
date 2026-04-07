###################################
# Ejercicio 1
###################################

precio = float(input("Ingrese el precio del producto: "))

for cantidad in range (1, 11):
    print ("Los precios a por mayor son:", (cantidad * precio))

###################################
# Ejercicio 2
###################################


ahorro = 0.0

while ahorro < 10000:
    ingreso = float(input("Cuanto deseas abonar para llegar a nuestra meta de 10000!!!: "))
    ahorro += ingreso
    print("Tu ahorro actual es de: ", ahorro)

print("Felicidades has llegado a nuestra meta de 10000!!!")


