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

def promedio(total_unidades, lotes):
    if lotes == 0:
        return 0
    promedio = total_unidades / int(lotes)
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

def mayor_cantidad():
    if total_unidades_fertilizante > total_unidades_insecticida and total_unidades_fertilizante > total_unidades_herbicida:
        return "Fertilizante"
    elif total_unidades_insecticida > total_unidades_fertilizante and total_unidades_insecticida > total_unidades_herbicida:
        return "Insecticida"
    elif total_unidades_herbicida > total_unidades_fertilizante and total_unidades_herbicida > total_unidades_insecticida:
        return "Herbicida"
    else:
        return "Estan todos con la misma cantidad de unidades"

def mayor_lotes():
    if lotes_fertilizantes > lotes_insecticidas and lotes_fertilizantes > lotes_herbicidas:
        return "Fertilizante"
    elif lotes_insecticidas > lotes_fertilizantes and lotes_insecticidas > lotes_herbicidas:
        return "Insecticida"
    elif lotes_herbicidas > lotes_fertilizantes and lotes_herbicidas > lotes_insecticidas:
        return "Herbicida"
    else:
        return "Estan todos con la misma cantidad de lotes"

def promedio_productos_producidos():
    total_unidades = total_unidades_fertilizante + total_unidades_herbicida + total_unidades_insecticida
    total_lotes = lotes_fertilizantes + lotes_herbicidas + lotes_insecticidas
    promedio = total_unidades / total_lotes
    return promedio
    

codigos_erroneos = []
fertilizante = []
insecticida = []
herbicida = []

total_unidades_fertilizante = 0
total_unidades_insecticida = 0
total_unidades_herbicida = 0

while True:
    lote_produccion = input("Ingrese el lote de produccion: ")
    if len(lote_produccion) == 5:
        if lote_produccion[-1] == "1" or lote_produccion[-1] == "0":
            if lote_produccion[0] == "1":
                fertilizante.append(lote_produccion)
                total_unidades_fertilizante += int(lote_produccion[1:4])
            elif lote_produccion[0] == "2":
                insecticida.append(lote_produccion)
                total_unidades_insecticida += int(lote_produccion[1:4])
            elif lote_produccion[0] == "3":
                herbicida.append(lote_produccion)
                total_unidades_herbicida += int(lote_produccion[1:4])
        else:
            print("Codigo de producto invalido")
            codigos_erroneos.append(lote_produccion)
    elif lote_produccion == "FIN":
        break
    else:
        print("Codigo de producto invalido")
        codigos_erroneos.append(lote_produccion)


lotes_fertilizantes = int(len(fertilizante))
lotes_insecticidas = int(len(insecticida))
lotes_herbicidas = int(len(herbicida))

promedio_fertilizante = promedio(total_unidades_fertilizante, lotes_fertilizantes)
promedio_insecticida = promedio(total_unidades_insecticida, lotes_insecticidas)
promedio_herbicida = promedio(total_unidades_herbicida, lotes_herbicidas)

categoria_fertilizante = categoria(total_unidades_fertilizante)
categoria_insecticida = categoria(total_unidades_insecticida)
categoria_herbicida = categoria(total_unidades_herbicida)




print(f"Datos invalidos detectados: {codigos_erroneos}")
print(f"{"Producto":<15}{"|"}{'Lotes':>15}{"|"}{'Total Unidades':>15}{"|"}{'Prom. por lote':>15}{"|"}{'Categoria':>15}")
print(f"{"Fertilizante":<15}{"|"}{lotes_fertilizantes:>15}{"|"}{total_unidades_fertilizante:>15}{"|"}{promedio_fertilizante:>15}{"|"}{categoria_fertilizante:>15}")
print(f"{"Insecticida":<15}{"|"}{lotes_insecticidas:>15}{"|"}{total_unidades_insecticida:>15}{"|"}{promedio_insecticida:>15}{"|"}{categoria_insecticida:>15}")
print(f"{"Herbicida":<15}{"|"}{lotes_herbicidas:>15}{"|"}{total_unidades_herbicida:>15}{"|"}{promedio_herbicida:>15}{"|"}{categoria_herbicida:>15}")
print(f"Producto con mayor cantidades: {mayor_cantidad()}")
print(f"Producto con mas lotes: {mayor_lotes()}")
print(f"promedio de productos producidos: {round(promedio_productos_producidos(), 2)}")

