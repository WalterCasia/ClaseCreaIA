'''
# ==========================================
# Ejercicio 1. Control de entrada a un torneo
# ==========================================

nombre = input ("Ingresa tu nombre: ")
edad = int(input ("Ingresa tu edad: "))
inscripcion = input("¿Tienes la inscripcion confirmada? (si/no): ")

if edad >= 15 and inscripcion == "si": 
    print(f"{nombre} estas autorizado para ingresar al torneo")
else:
    print(f"{nombre} no estas autorizado para ingresar al torneo")

# ==========================================
# Ejercicio 2. Completar código: batería de celular
# ==========================================

bateria = int(input("Ingrese el porcentaje de batería: "))
if bateria <= 20:
    print("Debe cargar el celular")
else:
    print("La batería es suficiente")

# ==========================================
# Ejercicio 3. Clasificación de envío
# ==========================================

peso_paquete = float(input("Ingrese el peso del paquete en kg: "))

if peso_paquete > 0 and peso_paquete < 1:
    print("Paquete liviano.")
elif peso_paquete >= 1 and peso_paquete < 5:
    print("Paquete estandar.")
elif peso_paquete >= 5:
    print("Paquete pesado.")
else:
    print("Ingrese un peso correcto.")

# ==========================================
# Ejercicio 4. Corregir código: semáforo
# ==========================================

color = input("Ingrese el color del semáforo: ")
if color == "verde":
    print("Avanzar")
elif color == "amarillo":
    print("Precaución")
else:
    print("Detenerse")
'''
# ==========================================
# Ejercicio 5. Acceso VIP a concierto con compra de bebida
# ==========================================

nombre = input("Ingresa el nombre del cliente: ")
edad = int(input("Ingresa la edad del cliente: "))
tipo_entrada = input("Ingresa el tipo de entrada (general o VIP): ")

if edad >= 18 and tipo_entrada =="VIP":
    print(f"Acceso VIP aprobado para {nombre}")
    bebida = input("El cliente desea compra una bebida? (si/no): ")
    if bebida == "si":
        dinero_dispo = float(input("Ingresa el dinero disponible del cliente: "))
        precio_bebida = float(input("Ingresa el precio de la bebida: "))
        if dinero_dispo >= precio_bebida:
            dinero_dispo -= precio_bebida
            print(f"Compra de bebida aprobada, el cambio del cliente es de {dinero_dispo}")
        else:
            print("Compra de bebida denegada")
    else:
        print("Procede al concierto")
elif tipo_entrada == "general":
    print(f"Acceso general aprobado para {nombre}")
else:
    print("No puede ingresar :(")

'''
# ==========================================
# Ejercicio 6. Sistema de becas estudiantiles por promedio y condición económica
# ==========================================

nombre_estudiante = input("INgrese el nombre del estudiante: ")
promedio_final = int(input("Ingrese el promedio final del estudiante: "))
ingreso_fam_mensual = float(input("Ingrese el ingreso familiar mensual: "))
mat_aprovadas = int(input("Ingrese la cantidad de materias aprobadas: "))

if promedio_final <= 70:
    beca = "sin_beca"
elif promedio_final >= 71 and promedio_final <= 84:
    beca = "parcial"
elif promedio_final >= 85:
    beca = "completa"

match beca:
    case "sin_beca":
        print(f"nombre: {nombre_estudiante}")
        print("Resultado: Sin beca")
        print("Beca: 0")
    case "parcial":
        if ingreso_fam_mensual <= 400000:
            print(f"nombre: {nombre_estudiante}")
            print("Resultado: Beca parcial")
            print("Beca: 50000")
        else:
            print("Resultado: Sin beca")
            print("Beca: 0")
    case "completa":
        if mat_aprovadas >= 5 and ingreso_fam_mensual <= 400000:
            print(f"nombre: {nombre_estudiante}")
            print("Resultado: Beca completa")
            print("Beca: 100000")
        else:
            print("Resultado: Sin beca")
            print("Beca: 0")

# ==========================================
# Ejercicio 7. Tarifa de hotel con recargo y descuento
# ==========================================

nombre_cliente = input("Ingrese el nombre del cliente: ")
temporada = input("Ingrese la temporada (alta, media o baja): ")
cant_noches = int(input("Ingrese la cantidad de noches: "))
precio_noche = float(input("Ingrese el precio por noche: "))
membresia = input("Se tiene membresia?: (si/no): ")


match temporada:
    case "alta":
        recargo = precio_noche * 0.20
        print(f"Precio por noche, se aplica recargo del 20%: {recargo}")
        subtotal_recargo = (precio_noche + recargo) * cant_noches
    case "media":
        recargo = precio_noche * 0.10
        print(f"Precio por noche, se aplica recargo del 10%: {recargo}")
        subtotal_recargo = (precio_noche + recargo) * cant_noches
    case "baja":
        recargo = 0
        print(f"Precio por noche: {precio_noche}")
        subtotal_recargo = (precio_noche + recargo) * cant_noches

if membresia == "si" and cant_noches >= 3:
    descuento = precio_noche * 0.15
    print(f"Precio por noche, se aplica descuento del 15%: {descuento}")
elif membresia == "si" or cant_noches == 2:
    descuento = precio_noche * 0.05
    print(f"Precio por noche, se aplica descuento del 5%: {descuento}")
else:
    print(f"Precio por noche, no se aplica descuento.")
    descuento = 0


total = cant_noches * (precio_noche + recargo - descuento)

print(f"Cliente: {nombre_cliente}")
print(f"Subtotal: {subtotal_recargo}")
print(f"Descuento aplicado: {descuento}")
print(f"Total final a pagar: {total}")

# ==========================================
# Ejercicio 8. Menú de academia con permisos
# ==========================================

print("=== Menu Academia ===")
print("1. Matricular")
print("2. Notas")
print("3. Certficado")
print("4. Salir")

tipo_usuario = input("Ingrese el tipo de usuario:  ( admin , profesor , estudiante ): ")
opcion = input("Ingrese una opcion: ")


match opcion:
    case ("1" | "matricular") if tipo_usuario == "admin" or tipo_usuario == "profesor" :
        print("Proceso de matriculacion aprobado")
    case ("2" | "notas") if tipo_usuario == "profesor" or tipo_usuario == "estudiante":
        print("Proceso de notas aprobado")
    case ("3" | "certificado") if tipo_usuario == "estudiante":
        promedio = float(input("Ingresa tu promedio: "))
        if promedio >= 70:
            print("Certificado generado correctamente")
        else:
            print("No se puede generar el certificado por promedio bajo ")
    case ("4" | "salir"):
        print("Has salido del menu.")
    case _:
        print("ERROR !!!! Opcion no valida")

# ==========================================
# Ejercicio 9. Sistema de tienda gamer con promociones y validación de stock
# ==========================================

nombre_cliente = input("Ingrese el nombre del cliente: ")
nombre_producto = input("Ingrese el nombre del producto: ")
precio_unitario = float(input("Ingrese el precio unitario del producto: "))
cant_deseada = int(input("Ingrese la cantidad deseada: "))
cant_stock = int(input("Ingrese el stock actual: "))
membresia = input("tiene membresia gamer?: (si/no): ")

if cant_deseada > cant_stock:
    print("No se puede hacer la venta, falta de stock.")
elif cant_deseada < cant_stock:
    subtotal = precio_unitario * cant_deseada
    if subtotal >= 50000 and membresia =="si":
        descuento = subtotal * 0.20
    elif (subtotal > 30000 and subtotal < 50000) or membresia == "si":
        descuento = subtotal * 0.10
    else:
        print("No aplica descuento.")
    total_final = subtotal - descuento
    print("Venta aprobada")
    print(f"Subtotal: {subtotal}")
    print(f"Descuento: {descuento}")
    print(f"Total final: {total_final}")


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
            print ("No cuentas con todos los requisitos")
    case ("4" | "salir"):
            print("has salido del menu")
    case _:
        print("No has ingresao una opcion valida del menu")

total = recompensa + bono
print(f"Mision de {op_mision} completada")
print (f"Recompensa base: {recompensa}")
print (f"Bono adicional: {bono}")
print (f"Recompensa total: {total}")
'''
