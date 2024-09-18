# Proyecto Twitter Clone - Backend

Este repositorio contiene el backend de la aplicación **Twitter Clone**, desarrollado con **.NET**. Proporciona la lógica del servidor y las APIs necesarias para manejar las funcionalidades de la aplicación.

## Tecnologías Utilizadas

Este proyecto sigue principios y buenas prácticas modernas de desarrollo de software. Algunas de las tecnologías y patrones implementados son:

- **Onion Architecture**: Separa las preocupaciones de la aplicación en capas, promoviendo la flexibilidad y el desacoplamiento.
- **CQRS (Command Query Responsibility Segregation)**: Divide las responsabilidades entre comandos (modificaciones) y consultas (lecturas) para mejorar el rendimiento y la escalabilidad.
- **MediatR**: Implementa el patrón de mediador para manejar las solicitudes dentro del sistema de manera eficiente.
- **Métodos Genéricos**: Se han utilizado métodos genéricos para reducir la duplicación de código y mejorar la reutilización.
- **Entity Framework Core**: ORM (Object-Relational Mapper) utilizado para la interacción con la base de datos de forma eficiente y sencilla.

## Características del Backend

- **8 Entidades Principales**: La API gestiona 8 entidades principales que representan los distintos elementos del sistema.
- **Creación Automática de Entidades**: Las entidades se crean automáticamente, facilitando la expansión de la base de datos sin la necesidad de generar cada entidad manualmente.

## Estructura del Proyecto

El proyecto está organizado siguiendo la arquitectura Onion, con capas claramente definidas:

1. **Core**: Contiene las entidades de negocio y las interfaces, siguiendo el principio de inversión de dependencias.
2. **Application**: Gestiona la lógica de la aplicación, incluyendo las implementaciones de CQRS y MediatR.
3. **Infrastructure**: Contiene la implementación de servicios y acceso a datos, incluyendo Entity Framework Core.
4. **API**: La capa de presentación que expone los endpoints para interactuar con el sistema.

## Instalación y Configuración

### Requisitos Previos

Asegúrate de tener instalados los siguientes elementos:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (o cualquier otro motor de base de datos compatible con Entity Framework Core)

### Pasos para Ejecutar el Proyecto

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/usuario/twitter-clone-backend.git
   cd Api_Red_Social
