from abc import ABC, abstractmethod

class Hospital:
    def __init__(self):
        self.pacientes = []
        self.personal_medico = []

    def registrar_nuevo_paciente(self, nombre, edad):
        nombre = Paciente(nombre, edad)
        self.pacientes.append(nombre)
        print("Nuevo paciente agregado a sistema ")
        

    def contratar_personal_medico (self, nombre, especialidad):
        nombre = (nombre, especialidad)
        self.personal_medico.append(nombre)
        print("Nuevo personal agregado a sistema ")

    def mostrar_pacientes(self):
        print("\n" + "="*45)
        print("         Pacientes del Hospital")
        print("="*45)
        for personas in self.pacientes:
            print(personas)

    def mostrar_personal(self):
        print("\n" + "="*45)
        print("         Personal del Hospital")
        print("="*45)
        for personal in self.personal_medico:
            print(personal)
        
class PersonalMedico(ABC):

    def __init__(self, nombre, especialidad):
        self.nombre = nombre
        self.especialidad = especialidad
    
    def __str__(self):
        return f"Nombre: {self.nombre} Especialidad: {self.especialidad}"

    @abstractmethod
    def realizar_labor(self):
        pass

class Doctor(PersonalMedico):
    def realizar_labor(self):
        print(">> Realizando diagnostico especializado.")

    def atender_paciente(self, objeto_paciente):
        diagnostico_doctor = input(f"Ingrese el diagnostico del paciente {Paciente.nombre}: ")
        Paciente.historial_paciente.AgregarObservaciones(diagnostico_doctor)
        dosis_recomendada = int(input("Ingrese la dosis recomendada: "))
        Paciente.salud += dosis_recomendada
        print(f"!Tratamiento exitoso! La salud de {self.nombre} ha subido a {self.salud}%")

class Enfermero(PersonalMedico):
    def realizar_labor(self):
        print(">> Aplicando cuidados y revisando signos vitales.")

class HistoriaClinico:
    def __init__(self):
        self.observaciones = []

    def AgregarObservaciones(self, obs_agregada):
        self.observaciones.append(obs_agregada)
        
    def MostrarNotas(self):
        for notas in self.observaciones:
            print(notas)

class Paciente:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
        self.historial_paciente = HistoriaClinico()
        self.salud = 100
        self.estado = "Estable"

    def __str__(self):
        print(f"Nombre: {self.nombre} Edad: {self.edad}")
        
    def diagnostico_salud(self, salud):
        if salud < 20 and salud > 0:
            self.estado_salud = "Critico"
        else:
            pass

vida_sana = Hospital()
while True:
    print("\n>>> SISTEMA HOSPITALARIO VIDA-SANA <<<\n")
    print("1. Regitrar Paciente \n2. Contratar personal \n3. Realizar Consulta Medica \n4. Ver reporte del Pabellon \n5. Salir  \n")
    opcion = int(input("Seleccione una opcion: "))
    if opcion == 1:
        nombre_paciente = input("Ingrese el nombre del nuevo paciente: ")
        edad_paciente = input("Ingrese la edad del paciente: ")
        vida_sana.registrar_nuevo_paciente(nombre_paciente, edad_paciente)
    elif opcion == 2:
        nombre_personal = input("Ingrese el nombre del nuevo personal: ")
        especialidad_personal = input("Ingrese la especialidad del nuevo personal: ")
        vida_sana.contratar_personal_medico(nombre_personal, especialidad_personal)
    elif opcion == 3:
        vida_sana.mostrar_personal()
        medico_elegido = input("Elija el medico: ")
        vida_sana.mostrar_pacientes()
        paciente_a_tratar = input("Elija el paciente: ")
        
        Doctor.atender_paciente(paciente_a_tratar)
    elif opcion == 4:
        vida_sana.mostrar_pacientes
    elif opcion == 5:
        print("Saliendo del programa")
        break
    else:
        print("Ingrese una opcion valida. ")

