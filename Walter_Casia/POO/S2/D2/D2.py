'''
class Cuenta:
    def __init__(self,  saldo_inicial):
        self.nombre = "Publica"
        self.__saldo = saldo_inicial

mi_cuenta = Cuenta(1000)
print(mi_cuenta.nombre) 
print("mi_cuenta.__saldo")

'''

class RegistroAcademico:
    def __init__(self, nombre_alumno, nota_inicial):
        self.nombre = nombre_alumno
        self.__nota = nota_inicial
        self.cuenta_activa = True

    def get_nota(self):
        return self.__nota
    
    def bloquear_cuenta(self):
        self.cuenta_activa == False
    
    def set_nota(self, nueva_nota):
        if self.cuenta_activa == False:
            return -2
        elif int(nueva_nota) >= 0 and int(nueva_nota) <= 100:
            self.__nota = nueva_nota
            return 1
        else:
            return -1
        
alumna1 = RegistroAcademico("Laura", 85)
intentos_permitidos = 3

while intentos_permitidos > 0:
    nota_nueva = input("Ingrese la nueva nota: ")
    nota_actual = alumna1.set_nota(nota_nueva)
    if nota_actual == 1:
        print(f"Felicidades por tu nota. Tu nueva nota es: {alumna1.get_nota()}")
        break
    elif nota_actual == -1:
        intentos_permitidos -= 1
        print(f"Ingresa un dato valido, te quedan {intentos_permitidos} intentos.")
    elif intentos_permitidos == -2:
        print("Ya no tienes intentos, cuenta bloqueada!! se cierra programa")

if intentos_permitidos == 0:
    alumna1.bloquear_cuenta()

