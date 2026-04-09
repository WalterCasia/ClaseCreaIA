###############################
#####   Productos Agroindustriales Comodín S.A   #####
###############################

print("Bienvenido a la linea de produccion")
print("////////////////////////////////////")
print("Menu de prooductos en stock")
print("1. Fertilizante")
print("2. Insecticidas")
print("3. Herbicidas")
print("////////////////////////////////////")

mensaje_error = f"Lote de produccion invalido."

def promedio(total_unidades, lotes):
    if lotes == 0:
        return 0
    promedio = total_unidades / lotes
    return promedio

def categoria(total_unidades):
    if total_unidades >= 0 and total_unidades <= 99:
        return "Insuficiente"
    if total_unidades >= 100 and total_unidades <= 299:
        return "Regular"
    if total_unidades >= 300 and total_unidades <= 599:
        return "Idoneo"
    if total_unidades >= 600:
        return "Sobreproduccion"

def mayor_cantidad(u_fertilizantes, u_insecticida, u_herbicitdas):
    if u_fertilizantes > u_insecticida and u_fertilizantes > u_herbicitdas:
        return "Fertilizante"
    elif u_insecticida > u_fertilizantes and u_insecticida > u_herbicitdas:
        return "Insecticida"
    elif u_herbicitdas > u_fertilizantes and u_herbicitdas > u_insecticida:
        return "Herbicida"
    else:
        return "Dos o mas tienen la misma cantidad de unidades"

def mayor_lotes(cant_fertilizante, cant_insecticidas, cant_herbicidas):
    if cant_fertilizante > cant_insecticidas and cant_fertilizante > cant_herbicidas:
        return "Fertilizante"
    elif cant_insecticidas > cant_fertilizante and cant_insecticidas > cant_herbicidas:
        return "Insecticida"
    elif cant_herbicidas > cant_fertilizante and cant_herbicidas > cant_insecticidas:
        return "Herbicida"
    else:
        return "Dos o mas tienen la misma cantidad de unidades"

def promedio_productos_producidos(tu_fertilizante, tu_herbicida, tu_insecticida , l_fertilizante, l_herbicida, l_insecticida):
    total_unidades = tu_fertilizante + tu_herbicida + tu_insecticida
    total_lotes = l_fertilizante + l_herbicida + l_insecticida
    if total_lotes != 0:
        promedio = total_unidades / total_lotes
    else:
        print("No procede, sin lotes registrados.")
        promedio = 0
    return promedio
    

codigos_erroneos = []
fertilizante = []
insecticida = []
herbicida = []

total_unidades_fertilizante = 0
total_unidades_insecticida = 0
total_unidades_herbicida = 0

while True:
    lote_produccion = input("Ingrese el lote de produccion: ").upper()
    if len(lote_produccion) == 5:
        if lote_produccion[-1] == "1" or lote_produccion[-1] == "0":
            if lote_produccion[0] == "1":
                try:
                    fertilizante.append(lote_produccion)
                    total_unidades_fertilizante += int(lote_produccion[1:4])
                except:
                    print(mensaje_error, lote_produccion)
                    codigos_erroneos.append(lote_produccion)
            elif lote_produccion[0] == "2":
                try:
                    insecticida.append(lote_produccion)
                    total_unidades_insecticida += int(lote_produccion[1:4])
                except:
                    print(mensaje_error)
                    codigos_erroneos.append(lote_produccion)
            elif lote_produccion[0] == "3":
                try:
                    herbicida.append(lote_produccion)
                    total_unidades_herbicida += int(lote_produccion[1:4])
                except:
                    print(mensaje_error)
                    codigos_erroneos.append(lote_produccion)
            else:
                print(mensaje_error)
                codigos_erroneos.append(lote_produccion)
        else:
            print(mensaje_error)
            codigos_erroneos.append(lote_produccion)
    elif lote_produccion == "FIN":
        break
    else:
        print(mensaje_error)
        codigos_erroneos.append(lote_produccion)


lotes_fertilizantes = len(fertilizante)
lotes_insecticidas = len(insecticida)
lotes_herbicidas = len(herbicida)

promedio_fertilizante = promedio(total_unidades_fertilizante, lotes_fertilizantes)
promedio_insecticida = promedio(total_unidades_insecticida, lotes_insecticidas)
promedio_herbicida = promedio(total_unidades_herbicida, lotes_herbicidas)

categoria_fertilizante = categoria(total_unidades_fertilizante)
categoria_insecticida = categoria(total_unidades_insecticida)
categoria_herbicida = categoria(total_unidades_herbicida)


print(f"\nDatos invalidos detectados: {codigos_erroneos}\n")

print("--------------------------------------------------------------------------------")
print(f"{"Producto":<15}{"|"}{'Lotes':>15}{"|"}{'Total Unidades':>15}{"|"}{'Prom. por lote':>15}{"|"}{'Categoria':>15}")
print(f"{"Fertilizante":<15}{"|"}{lotes_fertilizantes:>15}{"|"}{total_unidades_fertilizante:>15}{"|"}{round(promedio_fertilizante,2):>15}{"|"}{categoria_fertilizante:>15}")
print(f"{"Insecticida":<15}{"|"}{lotes_insecticidas:>15}{"|"}{total_unidades_insecticida:>15}{"|"}{round(promedio_insecticida,2):>15}{"|"}{categoria_insecticida:>15}")
print(f"{"Herbicida":<15}{"|"}{lotes_herbicidas:>15}{"|"}{total_unidades_herbicida:>15}{"|"}{round(promedio_herbicida,2):>15}{"|"}{categoria_herbicida:>15}")
print("-------------------------------------------------------------------------------- \n")
print(f"Producto con mayor cantidades: {mayor_cantidad(total_unidades_fertilizante, total_unidades_insecticida,total_unidades_herbicida)}")
print(f"Producto con mas lotes: {mayor_lotes(lotes_fertilizantes, lotes_insecticidas, lotes_herbicidas )}")
print(f"promedio de productos producidos: {round(promedio_productos_producidos(total_unidades_fertilizante, total_unidades_herbicida, total_unidades_insecticida, lotes_fertilizantes, lotes_herbicidas, lotes_insecticidas), 2)}\n")

