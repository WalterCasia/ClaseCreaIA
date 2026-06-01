'''
contador = 1

while contador < 5:
    print("Soy el ciclo while")
    valor = float(input("Ingrese un numero pequeño de aumento: "))
    contador = contador + valor

clave_correcta = "1234"

intento = ""

while intento != clave_correcta:
    intento = input("Ingrese la clave correcta: ")

print("Clave correcta! Acceso concedido.")


opcion = ""

while opcion != "salir" or opcion != "2":
    print("1 - saludar")
    print("2 - salir")
    opcion = input("Ingrese una opcion: ")

    if opcion == "1" or opcion == "saludar":
        print("Hola")
    elif opcion == "2" or opcion == "salir":
        print("Adios")
    else:
        print("Opcion no valida")
'''

for numero_turno in range(5):
    print("BEEP: Producto escaneado: (turno es:",   numero_turno + 1, ")")

for pasillo in range (1, 10, 2):
    print("El pasillo es:", pasillo)


### Ejemplo 3 carrito de compras

total = 0.0