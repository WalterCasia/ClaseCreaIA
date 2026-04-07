'''

print("Bienvenido a la tienda digital")
# print("Que desea comprar?")

# input ("Que desea comprar?")
nombre_producto = input ("Que desea comprar?")
print("El producto que escogio es: ", end="")
print(nombre_producto)

print (f'El producto que escogio es: {nombre_producto}')

print ("El producto que escogio es: " + nombre_producto)

print("Gracias por tu visita!! Antes de irte nos puedes decir ")
productoFav = input("cual ha sido tu producto favorito el dia de hoy? ")
calificacion = input("Agradecemos nos puedas calificar (siendo 1 muy malo y 10 excelente): ")

print("Agradecemos tu visita esperamos que vuelvaas pronto!!! :)")

print("1. leche")
print("2. cafe")
print("3. arroz")

print("1. leche\n2. cafe\n3. arroz")

print("producto \t precio")
print("1. leche \t 2.50")
print("2. cafe \t 5.00")
print("3. arroz \t 3.50")
'''

primerProducto = input ("Cual es el primer producto? ")
segundoProducto = input ("Cual es el segundo producto? ")
tercerProducto = input ("Cual es el tercer producto? ")

precioPrimero = input (f"Cual es el precio de {primerProducto}? ")
precioSegundo = input (f"Cual es el precio de {segundoProducto}? ")
precioTercero = input (f"Cual es el precio de {tercerProducto}? ")

cantPrimero = input (f"cuanto de {primerProducto} hay disponibles? ")
cantSegundo = input (f"cuanto de {segundoProducto} hay disponibles? ")
canTercero = input (f"cuanto de {tercerProducto} hay disponibles? ")

print("################################")
print("########### FACTURA ############")
print("################################")
print("PRODUCTOS \tPRECIO \tCANTIDAD")
print("################################")
print(f"1.{primerProducto:10s} \t {precioPrimero:5s}$ \t{cantPrimero:5s}")
print(f"2.{segundoProducto:10s} \t {precioSegundo:5s}$ \t{cantSegundo:5s}")
print(f"3.{tercerProducto:10s} \t {precioTercero:5s}$ \t{canTercero:5s}")
print("################################")
