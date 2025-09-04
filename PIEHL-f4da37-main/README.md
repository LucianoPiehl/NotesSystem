| Technology         | Version             |
| ------------------ | ------------------- |
| Java               | 23 (2024-09-17)     |
| Apache Maven       | 3.9.9               |
| Spring Boot        | 3.5.3               |
| MariaDB            | 10.4.32 (via XAMPP) |
| Node.js (frontend) | 22.14.0             |
| npm (frontend)     | 10.9.2              |

📁 Reported Dependencies (pom.xml)
spring-boot-starter-web: 3.5.3

spring-boot-starter-data-jpa: 3.5.3

spring-boot-starter-jdbc: 3.5.3

spring-boot-starter-validation: 3.5.3

mysql-connector-j: 9.2.0

lombok: 1.18.38

💡 Spring Boot Starter also includes:

spring-core: 6.2.8

spring-context: 6.2.8

spring-webmvc: 6.2.8

hibernate-core: 6.6.18.Final

jakarta.persistence-api: 3.1.0



🚀 Application Setup (run.sh)
This project includes a Bash script to automatically install dependencies, configure the database, and start both the backend and the frontend.

Requirements
A Linux system (Ubuntu 22.04 or similar)

Internet access

Git installed (optional, if not cloning manually)

⚠
What the Script Does
Installs:

Java 23 (manual install if missing)

Apache Maven

Node.js 22 and npm

MariaDB server

Creates the required database (s1)

Starts the backend using Spring Boot

Installs frontend dependencies and starts the React app

How to Use

From the root of the repository (same level as backend/ and frontend/), run:

chmod +x run.sh
./run.sh
This will:

Start the backend at: http://localhost:8080

Start the frontend at: http://localhost:3000

🧠 If your system does not have gnome-terminal, edit the script and replace it with your preferred terminal emulator (e.g., xterm, konsole).

Personal notes:
NoteList → el estado recuerda qué notas mostrar y si están archivadas o no; el efecto asegura que la lista se actualice cuando cambian filtros o el estado de archivado.

TagFilter → el estado recuerda qué etiquetas el usuario está usando para filtrar; el efecto hace que las notas se filtren automáticamente cuando cambian esas etiquetas.

NoteEditor → el estado guarda los cambios que el usuario hace en título y contenido mientras escribe; el efecto con debounce evita saturar el backend y actualiza los campos solo cuando es necesario.

ErrorMessage → el estado recuerda si hay un mensaje de error que mostrar o si debe ocultarse.

TagList → el estado guarda temporalmente el nombre y color de una etiqueta antes de enviarla al backend, asegurando que los datos estén listos para guardar.

@JsonIgnore hace que, al crear el JSON de una nota, no intente recrear las notas que contiene cada etiqueta.

El Service evita que el Controller hable directamente con el Repository, desacoplando la lógica de negocio de la gestión de datos.

Para windows:

wsl --install -d Ubuntu 

wsl --set-default-version 2 

.\run_windows.ps1 

Ingresar ruta de donde está run.sh
