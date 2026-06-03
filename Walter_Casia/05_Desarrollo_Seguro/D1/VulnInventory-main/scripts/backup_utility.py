#!/usr/bin/env python3
"""
VulnInventory - Utility Command Line Tool
Vulnerable by Design Python Automation Script
Class Topic: OS Command Injection (Thursday)

This script simulates an automated system backup or report generation tool.
It takes a user-supplied archive name and compresses project files.
"""

import os
import sys

def main():
    print("=====================================================")
    print("VulnInventory - Utilidad de Respaldo de Seguridad")
    print("=====================================================")
    
    # Prompt the user for an archive name
    print("\nEste script automatiza el respaldo del código y configuración.")
    archive_name = input("Ingrese el nombre para el archivo de respaldo (.zip): ").strip()
    
    if not archive_name:
        print("Error: Debe ingresar un nombre válido.")
        sys.exit(1)
        
    # Procesamiento del comando de respaldo
    command = f"zip -r '{archive_name}.zip' ../backend/ -x '*/node_modules/*'"
    
    print(f"\n[COMANDO A EJECUTAR]: {command}\n")
    print("Ejecutando compresión en el sistema operativo...")
    
    # Execute the command
    exit_code = os.system(command)
    
    if exit_code == 0:
        print(f"\nRespaldo exitoso. Creado: '{archive_name}.zip'")
    else:
        print(f"\nError al ejecutar el respaldo (Código de salida: {exit_code})")

if __name__ == "__main__":
    main()
