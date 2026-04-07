print("--- EJERCICIO 1: MODELANDO LA TIENDA ---")

# PASO 1: Creamos los Planos Arquitectónicos (Clases en PascalCase)
class Cajero:
    pass

class Inventario:
    pass

class VehiculoReparto:
    pass

# PASO 2: Fabricamos dos objetos a partir del molde Cajero (Variables en snake_case)
cajero_manana = Cajero()
cajero_tarde = Cajero()

print("Cajeros creados:")
print(cajero_manana)
print(cajero_tarde)

# PASO 3: Fabricamos un objeto de Inventario
inventario_principal = Inventario()
print("\nInventario principal creado:")
print(inventario_principal)

# PASO 4: Fabricamos una flota de vehículos a partir del mismo molde
camion_1 = VehiculoReparto()
camion_2 = VehiculoReparto()
moto_1 = VehiculoReparto()

print("\nFlota vehicular creada exitosamente.")


print("\n--- EJERCICIO 2: IDENTIDAD EN MEMORIA ---")

# 1. Definición de moldes
class FacturaEmitida:
    pass

class TerminalDePago:
    pass

# 2. Fabricación de objetos
factura_001 = FacturaEmitida()
factura_002 = FacturaEmitida()
terminal_principal = TerminalDePago()

# 3. Comprobación de origen usando type()
print("La terminal fue fabricada usando el molde:")
print(type(terminal_principal))

# 4. Comprobación de independencia usando id()
cedula_f1 = id(factura_001)
cedula_f2 = id(factura_002)

print("\nCédula de Memoria Factura 1:", cedula_f1)
print("Cédula de Memoria Factura 2:", cedula_f2)

# 5. Evaluación lógica: ¿Son el mismo objeto físico?
son_iguales = cedula_f1 == cedula_f2
print("\n¿La Factura 1 es físicamente la misma que la Factura 2?:", son_iguales)
# El resultado siempre será False, porque son galletas distintas hechas con el mismo molde.