'''
#Inventario basico de productos
nombre_producto = "camiseta"    #string
precio_producto = 19.99         #float
cantidad_producto = 50          #int   
descuento = True                #bool

#Imprimir valores

print("Nombre del producto" , nombre_producto, "Tipo: ", type(nombre_producto))
print("Precio del producto" , precio_producto, "Tipo: ", type(precio_producto))
print("Cantidad del producto" , cantidad_producto, "Tipo: ", type(cantidad_producto))
print("Descuento del producto" , descuento, "Tipo: ", type(descuento))

#operadores aritmeticos
valor1 = 10
valor2 = 3

resultado = valor1 + valor2

print("Resultado", resultado, )

#division normal
resultado = valor1 / valor2

#division entera

resultado_entero = valor1 // valor2

#modulo o resto de la division

resto = valor1 % valor2 #resultado es un int

#Ejercicio
#Caja registradora
print("Bienvenido a la tienda")
nombre_producto = input("Ingrese el nombre del producto: ") # string
precio_producto = float(input("Ingrese el percio del producto: "))
cantidad_producto = int(input("Ingrese la cantidad del producto: "))
cantidad_producto = int(cantidad_producto)

subtotal = precio_producto + cantidad_producto
impuesto =  subtotal * 0.15 
total = subtotal + impuesto

print("\n ---Resumen de la compra---")
# %s: string
# %f: float
# %d: int
#print("Nombre del producto", nombre_producto)
print("%25s:%10s" %("Nombre del producto", nombre_producto))
#print("Precio del producto", cantidad_producto)
print("%25s:%10.2f"%("Precio del producto", cantidad_producto))
#print("Cantidad del producto", cantidad_producto)
print("%25s:%10d"%("Cantidad del producto", cantidad_producto))
#print("Subtotal", subtotal)
print("%25s:%10.2f"%("Subtotal", subtotal))'''
'''
lastas_atun = 47
estantes_full = lastas_atun // 10
stock = lastas_atun % 10
print("\n----Resultado del proceso----")
print("Se pueden llenar", estantes_full, "estantes de 10 latas cada uno")
print("Se pueden colocar en stock", stock, "latas de atun")
'''

print("Bienvenidos a la tienda")
#datos del cl 

cliente_vip = True
articulos_comprados = 5
De_semana = "Lunes"

aplica_mayorista = articulos_comprados > 5 and (cliente_vip == True)
print ("Aplica mayorista", aplica_mayorista)\


edad = int(input("Ingresa tu edad: "))
membresia_vip = input("Tienes membresia vip? (si/no): ")
acceso = edad >= 18 and membresia_vip == "si"

print ("Acceso", acceso)



