'''
def saludo(nombre):
    print("Hola Buenos dias")
    print(f"Bienvenido {nombre}")
       

#saludo()

def despedida(nombre):
    print(f"Adios {nombre}")

def menu():
    print("Menu")
    print("1. Saludo")
    print("2. Despedida")
    print("3. Salir")
    nombre = input("Ingrese su nombre: ")
    opcion = input("Ingrese una opcion: ")
    while True:
        match opcion:
            case "1":
                saludo(nombre)
            case "2":
                despedida(nombre)
            case "3":
                print("Saliendo")
                break
            case _:
                print("Opcion invalida")
        opcion = input("Ingrese una opcion: ")

menu()

#Ejercicios
## 1. Funcion simple (Sin parametros ni retorno)

def mensaje_bienvenida ():  
    print("Bienvenidos al sistema de ventas")
    print("Esperamos que tenga una excelente compra")

mensaje_bienvenida()

#2. Funcion con parametros 
nombre = input("Ingrese su nombre: ")
def saludar_cliente(nombre):
    print(f"Hola {nombre}, bienvenido al gimnasio")

saludar_cliente(nombre)

#3 Funcion con retorno

precio = float(input("Ingrese el precio del producto: "))
cantidad = int(input("Ingrese la cantidad: "))

def calcular_total(precio, cantidad):
    total = precio * cantidad  
    return total

print(f"El total es: {calcular_total(precio, cantidad)}")
'''
#4 ejercicio integrador

precio_ficha = 500
dinero = 0

def menu():
    print("Menu")
    print("1. Comprar fichas")
    print("2. Salir")
menu()

def compra_fichas(dinero, precio_ficha):
    fichas_compradas = int(dinero / precio_ficha)
    print (f"Puedes comprar {fichas_compradas} fichas.")
    cant = int(input("Cuantas deseas comprar? "))
    totalfichas = cant * precio_ficha
    if totalfichas > dinero:
        print("Excede tu cantidad de fichas permitidas. No tienes suficiente dinero")
        return 0, dinero
    elif totalfichas <= dinero:
        print("Felicidades has comprado tus fichas!!!")
        resto_dinero = dinero - totalfichas
        return cant, resto_dinero
    else:
        print("Opcion invalida")
        return 0, dinero
    

while True:
    opcion = input("Ingrese una opcion: ")
    if opcion == "1" or opcion == "Comprar fichas":
        if dinero == 0:
            nombre = input("Ingrese su nombre: ")
            dinero = float(input("Ingrese la cantidad de dinero disponible: "))
            compradas, resto = compra_fichas(dinero, precio_ficha)
            print(f"Has comprado {compradas} fichas")
            print(f"Te quedan {resto} colones")
        elif dinero > 0 and resto >= precio_ficha:
            print(f"Tu dinero restante {nombre} es {resto}, deseas comprar mas?")
            if dinero >= precio_ficha:
                dinero = resto
                compradas, resto = compra_fichas(dinero, precio_ficha)
                print(f"Has comprado {compradas} fichas")
                print(f"Te quedan {resto} colones")
        else:
            print("No tienes suficiente dinero")
    elif opcion == "2" or opcion == "salir":
        print("Saliendo gracias por tu visita")
        break
    else:
        print("Opcion invalida")