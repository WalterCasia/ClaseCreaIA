class CuentaBancaria:
    tasa_interes_global = 0.05
    total_cuentas_creadas = 0

    def __init__(self, nombre_titular):
        self.__titular = nombre_titular
        self.__saldo = 0.0
        CuentaBancaria.total_cuentas_creadas += 1

    @property
    def saldo (self):
        return self.__saldo
    @property
    def titular (self):
        return self.__titular
    
    @titular.setter
    def titular (self, nombre_titular):
        if nombre_titular == "":
            print("Ingresa el nombre, no dejes el espacio en blanco")
        else:
            self.__titular = nombre_titular

    def depositar(self, cantidad):
        if cantidad > 0:
            self.__saldo = cantidad
            print(f"El saldo ha cambiado el saldo actual es: {self.__saldo}")
        else:
            print("Ingrese un saldo mayor a 0:")

    def retirar(self, cantidad):
        if cantidad <= self.__saldo and cantidad >= 0:
            self.__saldo -= cantidad
            print(f"El saldo ha cambiado el saldo actual es: {self.__saldo}")
        else:
            print("El saldo el mayor al saldo en tu cuenta.")

    def proyectar_intereses (self):
        intereses = self.__saldo * self.tasa_interes_global
        print(f"El cliente ganara {intereses} en inteses.")

    @classmethod
    def modificar_tasa_interes(cls, nueva_tasa):
        cls.tasa_interes_global = nueva_tasa 


cuenta1 = CuentaBancaria("Walter")
cuenta2 = CuentaBancaria("Emily")

print(f"El numero de cuentas creadas en el banco es de: {CuentaBancaria.total_cuentas_creadas}")
cuenta1.depositar(10000)
cuenta1.proyectar_intereses()
CuentaBancaria.modificar_tasa_interes(0.10)
cuenta1.proyectar_intereses()
print(cuenta1.titular)
cuenta1.titular = ""