#Simulador de Caja Registradora

class CajaRegistradora:
    def __init__(self, dinero_total, cajero):
        self.dinero = dinero_total
        self.cajero = cajero
    
    def cobrar_producto(self):
        precio_producto = float(input("Ingrese el precio del producto: "))
        self.dinero = self.dinero + precio_producto
        print(f"Cobro exitoso. Llevamos acumulado: {self.dinero}")

    def imprimir_cierrre (self):
        print(f"Atendido por el cajero: {self.cajero}")
        print(f"El total de la factura es: {self.dinero}.")
    

caja_express = CajaRegistradora(0, "Carlos")
caja_express.cobrar_producto()
caja_express.cobrar_producto()
caja_express.imprimir_cierrre()
