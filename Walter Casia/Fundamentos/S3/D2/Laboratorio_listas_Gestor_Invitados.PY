# Laboratorio listas: El Gestor de Invitados

lista_invitados = []

def agregar_invitado (nombre):
    lista_invitados.append(nombre)
    print (f"El nombre {nombre} ha sido agregado a la lista")

def mostrar_lista():
    print("Lista de invitados:")
    for invitados in lista_invitados:
        print(invitados)

def buscar_invitado(nombre):
    if nombre in lista_invitados:
        return True
    else:
        print("Nombre disponible")
        return False

def eliminar_invitado():
    nombre = input("Ingrese el nombre del invitado a eliminar: ")
    if nombre in lista_invitados:
        lista_invitados.remove(nombre)
        print (f"El nombre {nombre} ha sido eliminado")
    else:
        print("El nombre no se encuentra en la lista")


print("----- Menu de Invitados -----") 
print("1. Registrar un nuevo invitado.")
print("2. Ver lista completa.")
print("3. Eliminar al alguien (por si se porta mal).")
print("4. Salir")

while True:
    opcion = input("Ingrese una opcion del menu: ")
    match opcion:
        case "1":
            nombre = input("Ingrese el nombre del invitado: ")
            procede = buscar_invitado(nombre)
            if procede == False:
                agregar_invitado(nombre)
            else:
                print("El invitado ya está en la lista")
        case "2":
            mostrar_lista()
        case "3":
            eliminar_invitado()
        case "4":
            print("Saliendo del programa ... ")
            break
        case _:
            print("Opcion no valida")