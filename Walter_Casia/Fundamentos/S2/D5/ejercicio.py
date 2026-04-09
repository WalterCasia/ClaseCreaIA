

nombre_estudiante = input("Ingrese el nombre del estudiante: ")
edad = int(input("Ingrese la edad del estudiante: "))
autorizacion = input("Se tiene la autorizacion del profesor? (si/no): ")
saldo_dispo = float(input("Ingrese el saldo disponible: "))
costo_paquete_min = float(input("Ingrese el costo del paquete minimo: "))
paquetes_comprados = 0

if edad >= 15 and autorizacion == "si":
    print("Puede ingresar al lab")
    compra = input("¿Desea comprar un paquete adicional? (si/no):")
    while compra == "si":
        if saldo_dispo >= costo_paquete_min:
            paquetes_comprados += 1
            saldo_dispo -= costo_paquete_min
            print("Tu saldo disponible es: ", saldo_dispo)
            compra = input("¿Desea comprar un paquete adicional? (si/no):")
        else:
            print("No tiene saldo suficiente para comprar un paquete adicional")
            compra = "no"
    print("Adios Gracias preferirnos!!!")
    print(f"Acceso aprobado para {nombre_estudiante}")
    print(f"Paquetes comprados: {paquetes_comprados}")
    print(f"Saldo restante: {saldo_dispo}")
else:
    print("No puede ingresar al lab por falta de requisitos")
