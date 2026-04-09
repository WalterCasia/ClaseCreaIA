# ==========================================
# Ejercicio 10. Panel de misiones y cálculo de recompensa
# ==========================================
    
nombre_jugador = input("Ingrese el nombre del jugador: ")
clase_jugador = input("Ingrese la clase de jugador ( guerrero , mago , arquero): ")
nivel_jugador = int(input("Ingrese el nuvel de jugador: "))
cant_enemigos = int(input("Ingrese la cantidad de enemigos: "))

print("=== Menu ===")
print("1. Bosque")
print("2. castillo")
print("3. dragon")
print("4. salir")

op_mision = input("Ingrese la opcion de mision: ")

match op_mision:
    case ("1" | "bosque") if nivel_jugador >=1: 
        recompensa = cant_enemigos * 10
        bono = 0
    case ("2" | "castillo") if nivel_jugador >=5:
        recompensa = cant_enemigos * 20
        if clase_jugador == "guerrero" or clase_jugador =="mago":
            bono = 50
            recompensa = recompensa + bono
    case ("3" | "dragon") if nivel_jugador > 10 and clase_jugador == (guerrero | arquero):
        recompensa = cant_enemigos * 50
        if cant_enemigos > 3:
            bono = 100
            recompensa = recompensa + bono
        else:
            print("No cuentas con todos los requisitos")
    case ("4" | "salir"):
            print("has salido del menu")
    case _:
        print("No has ingresao una opcion valida del menu")

total = recompensa + bono
print(f"Mision de {op_mision} completada")
print (f"Recompensa base: {recompensa}")
print (f"Bono adicional: {bono}")
print (f"Recompensa total: {total}")
