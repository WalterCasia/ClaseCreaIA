'''
class Bateria:
    def __init__ (self):
        self.porcentaje = 100

    def descargar(self):
        self.porcentaje = self.porcentaje - 10
        print(f"Bateria al {self.porcentaje}%")
              
class Celular:
    def __init__ (self, marca):
        self.marca = marca
        self.energia = Bateria()

    def usar_app (self):
        print("Abriendo aplicacion...")
        self.energia.descargar()

mi_celular = Celular("Samsumg")
mi_celular.usar_app()
mi_celular.usar_app()

#######################################################


class Procesador:
    def __init__(self, modelo):
        self.modelo = modelo

class TarjetaVideo:
    def __init__(self, memoria_gb):
        self.memoria = memoria_gb

class Computadora:
    def __init__(self, cpu_externo, gpu_externa):
        self.cpu = cpu_externo
        self.gpu = gpu_externa

    def mostrar_especificaciones(self):
        print("Especificaiones del equipo: ")

        print(f"- procesador {self.cpu.modelo}")
        print(f"- graficos {self.gpu.memoria} gb de video.")

intel = Procesador("INTEL CORE I9")
nvidea = TarjetaVideo(24)

pc_gamer = Computadora(intel, nvidea)
pc_gamer.mostrar_especificaciones()

########################################

class Arma:
    def __init__(self, nombre, puntos_dano):
        self.nombre = nombre
        self.puntos_dano = puntos_dano

class Guerrero:
    def __init__(self, nombre, arma_equipada):
        self.nombre = nombre
        self.arma = arma_equipada

    def atacar(self):
        print(f"{self.nombre} ataca con {self.arma.nombre} causando {self.arma.puntos_dano} de dano!")

arma1 = Arma("Espada Larga", 50)
personaje = Guerrero("Marco", arma1)
personaje.atacar()
###############################################

class Estudiante:
    def __init__(self, nombre, carnet):
        self.nombre = nombre
        self.carnet = carnet

class Curso:
    def __init__(self, nombre_curso):
        self.nombre_curso = nombre_curso

        self.lista_matriculados = []

    def matricular(self, nuevo_estudiante):
        self.lista_matriculados.append(nuevo_estudiante)

        print(f"Sistema: {nuevo_estudiante.nombre} Maticulado con exito ")

    def pasar_lista(self):
        for alumno in self.lista_matriculados:
            print(f"*- {alumno.carnet}: {alumno.nombre}")

alumno1 = Estudiante("Luis", "A001")
alumno2 = Estudiante("Carlos", "A002")

curso_poo = Curso("POO")

curso_poo.matricular(alumno1)
curso_poo.matricular(alumno2)
curso_poo.pasar_lista()

'''
######################################

class Libro:
    def __init__ (self, titulo, autor):
        self.titulo = titulo
        self.autor = autor

    def __str__(self):
            return f"- {self.titulo} escrito por {self.autor}."

class Biblioteca:
    def __init__(self, nombre_sucursal ):
        self.nombre_sucursal = nombre_sucursal
        self.catalogo = []

    def agregar_libro(self, nuevo_libro):
        self.catalogo.append(nuevo_libro)

    def mostar_inventario(self):
        print(self.nombre_sucursal)
        for libro in self.catalogo:
            print(libro)

libro1 = Libro("Cien años de soledad", "Gabriel Garcia Marquez")
libro2 = Libro("El senor presidente", "Miguel Angel Asturias")
libro3 = Libro("Hombres de Maiz", "Miguel Angel Asturias")

biblioteca1 = Biblioteca(">>> BIBLIOTECA NACIONAL <<<")
biblioteca1.agregar_libro(libro1)
biblioteca1.agregar_libro(libro2)
biblioteca1.agregar_libro(libro3)

biblioteca1.mostar_inventario()