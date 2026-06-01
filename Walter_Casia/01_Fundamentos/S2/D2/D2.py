'''
dinero = 1000
precio = 75000

if dinero >= precio:
    print("venta aprovada")


# Ejmeplo 

print("==== SISTEMA DE SEGURIDAD DE BOEGA ====")

clave_ingresa = input ("Introduce la clave: ")
clave_correcta = "1234"

if clave_ingresa == clave_correcta:
    print("Clave correcta. Acceso permitido")
    print("Bienvenido a la bodega super segura")

print("Fin del progarama ")


dinero = float(input("Ingrese dinero del cliente: "))
precio = 1200

if dinero >= precio:
    print("Puede comprar el producto")
else:
    print("No puede comprar el producto")

'''
'''
print("======Sistema Cinepolis ======")

edad_usuario = int(input("ingresa tu edad: "))
entrada = input ("¿Tienes entrada? (si/no): ")

if edad_usuario >= 18 and entrada == "si":
    print("Bienvenido, puedes ingresar a ver la pelicula :)")
else:
    print("No puedes ingresar falta uno o todos los requerimientos para poder ingresar a ver la pelicula :(")


print("======Sistema Cinepolis ======")

edad_usuario = int(input("ingresa tu edad: "))

if edad_usuario >= 18 :
    entrada = input ("¿Tienes entrada? (si/no): ")
    if entrada == "si":
        print("Bienvenido, puedes ingresar a ver la pelicula :)")
    else:
        print("No posees entrada, compra una para poder ingresar :(")
else:
    print("No tienes la edad suficiente para ver la pelicula")


edad = int(input("ingrese su edad: "))
precio_entrada = 2000

if edad <= 12:
    print("Eres menor de edad, tienes un descuento del 50%")
    total = precio_entrada * 0.5
    print("El precio de tu entrada es: ", total)
elif edad >= 13 and edad <= 17:
    print("Eres adolescente, tienes un descuento del 25%")
    total = precio_entrada * 0.75
    print("El precio de tu entrada es: ", total)
else:
    print("Eres adulto, no tienes descuento")
    total = precio_entrada
    print("El precio de tu entrada es: ", total)

'''

print("======Inventario bodega======")

cajas_leche = int(input("Ingrese la cantidad de cajas de leche: "))

if cajas_leche > 20:
    print("Inventario saludable")
elif cajas_leche >= 1 and cajas_leche <=20:
    print("Alerta hacer pedido al proveedor")
elif cajas_leche == 0:
    print("Urgente producto agotado!!!!")
else:
    print("Ingrese un valor valido")


opcion = input("Seleccione una opcion (1-3)")

match opcion:
    case "1":
        print("Has seleccionado la opcion 1")
    case "2":
        print("Has seleccionado la opcion 2")
    case "3":
        print("Has seleccionado la opcion 3")
    case _:
        print("Opcion invalida")