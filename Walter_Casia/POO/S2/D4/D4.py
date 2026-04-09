with open ("registro.txt", "r") as archivo:
    contador = 0
    for linea in archivo:
        print(linea.strip())
        contador += 1

print(f"Las lineas leidas son {contador}")

