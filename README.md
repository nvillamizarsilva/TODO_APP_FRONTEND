# Aplicación de Lista de Tareas

Una aplicación web para organizar tus tareas diarias de forma sencilla y visual.

---

## Tabla de Contenidos

1. [¿Qué es TaskMaster?](#qué-es-taskmaster)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación Paso a Paso](#instalación-paso-a-paso)
4. [Cómo Usar la Aplicación](#cómo-usar-la-aplicación)
5. [Funcionalidades](#funcionalidades)
6. [Validaciones](#validaciones)
7. [Manejo de Errores](#manejo-de-errores)
8. [Organización del Proyecto](#organización-del-proyecto)
9. [Paleta de Colores](#paleta-de-colores)

---

## ¿Qué es TaskMaster?

TaskMaster es una aplicación que te permite crear, ver, editar y eliminar tareas. Piensa en ella como una lista de pendientes digital donde puedes:

- Agregar nuevas tareas con título y descripción
- Marcar tareas como completadas
- Buscar tareas por nombre
- Filtrar entre tareas pendientes y completadas
- Ver estadísticas de tu progreso

---

## Requisitos Previos

Antes de instalar la aplicación, necesitas tener instalado en tu computadora:

1. **Node.js** (versión 22 o superior)
   - Descárgalo desde: https://nodejs.org/
   - Para verificar si ya lo tienes, abre una terminal y escribe: `node --version`

2. **El servidor backend** debe estar corriendo en `http://localhost:3001`
   - La aplicación necesita conectarse al backend para guardar y obtener las tareas

---

## Instalación Paso a Paso

### Paso 1: Abrir la Terminal

- En Windows: Busca "CMD" o "PowerShell" en el menú de inicio
- En Mac: Busca "Terminal" en Spotlight

### Paso 2: Navegar a la Carpeta del Proyecto

Escribe el siguiente comando (ajusta la ruta según donde tengas el proyecto):

```bash
cd ruta/a/tu/carpeta/todo-frontend
```

### Paso 3: Instalar las Dependencias

Este comando descarga todas las librerías que necesita la aplicación:

```bash
npm install
```

Espera a que termine (puede tomar unos minutos).

### Paso 4: Iniciar la Aplicación

```bash
npm run dev
```

### Paso 5: Abrir en el Navegador

Una vez iniciada, verás un mensaje con una dirección similar a:

```
Local: http://localhost:5173/
```

Abre tu navegador web (Chrome, Firefox, Edge) y ve a esa dirección.

---

## Cómo Usar la Aplicación

### Pantalla Principal

Al abrir la aplicación verás:

1. **Encabezado** - El nombre "TaskMaster" con un botón para crear nuevas tareas
2. **Panel de Estadísticas** - Muestra:
   - Total de tareas
   - Tareas pendientes (en amarillo)
   - Tareas completadas (en verde)
   - Porcentaje de progreso
3. **Barra de Búsqueda y Filtros** - Para encontrar tareas específicas
4. **Lista de Tareas** - Todas tus tareas organizadas

### Crear una Nueva Tarea

1. Haz clic en el botón "Nueva Tarea"
2. Se abre una ventana emergente con un formulario
3. Escribe el título (obligatorio, mínimo 3 letras)
4. Opcionalmente, añade una descripción
5. Haz clic en "Crear Tarea"

### Editar una Tarea

1. En la tarea que quieres editar, haz clic en el icono del lápiz (azul)
2. Modifica el título, descripción o estado
3. Haz clic en "Actualizar"

### Marcar como Completada

- Haz clic en la casilla de verificación (checkbox) junto a la tarea
- La tarea cambiará de apariencia para indicar que está completada

### Eliminar una Tarea

La eliminación tiene **doble confirmación** para evitar borrados accidentales:

1. Haz clic en el icono de basura (rojo) en la tarea
2. **Primera confirmación**: Se pregunta "¿Estás seguro?"
3. Haz clic en "Sí, continuar"
4. **Segunda confirmación**: Advertencia final de que la acción es irreversible
5. Haz clic en "Eliminar definitivamente"

### Buscar Tareas

- Escribe en el campo de búsqueda
- Las tareas se filtran automáticamente mientras escribes
- Busca por título o descripción

### Filtrar Tareas

Usa los botones de filtro:
- **Todas**: Muestra todas las tareas
- **Pendientes**: Solo las que no están completadas
- **Completadas**: Solo las que ya terminaste

---

## Funcionalidades

| Función | Descripción |
|---------|-------------|
| **Listar tareas** | Ver todas las tareas guardadas |
| **Crear tarea** | Añadir una nueva tarea con título y descripción |
| **Editar tarea** | Modificar título, descripción o estado |
| **Eliminar tarea** | Borrar una tarea (con doble confirmación) |
| **Completar tarea** | Marcar/desmarcar una tarea como terminada |
| **Buscar** | Encontrar tareas por texto |
| **Filtrar** | Ver solo pendientes, completadas o todas |
| **Estadísticas** | Ver progreso general de las tareas |

---

## Validaciones

La aplicación verifica que los datos sean correctos antes de guardarlos:

### Al Crear o Editar una Tarea

| Campo | Regla | Mensaje de Error |
|-------|-------|------------------|
| **Título** | Obligatorio | "El título es obligatorio" |
| **Título** | Mínimo 3 caracteres | "El título debe tener al menos 3 caracteres" |
| **Descripción** | Opcional | No aplica |

### Comportamiento de Validación

- El botón de guardar no funciona si hay errores
- Los campos con error se resaltan en rojo
- El mensaje de error aparece debajo del campo

---

## Manejo de Errores

La aplicación está preparada para manejar situaciones inesperadas:

### Errores de Conexión

- Si el servidor no está disponible, aparece un mensaje de error
- El mensaje indica qué salió mal
- Puedes cerrar el mensaje haciendo clic en la X

### Errores al Guardar

- Si hay un problema al crear o editar, el formulario muestra el error
- Los datos que escribiste no se pierden
- Puedes intentar de nuevo

### Mensajes de Éxito

Cuando una acción se completa correctamente:
- Aparece una notificación verde en la esquina
- Desaparece automáticamente después de 3 segundos
- Ejemplos: "Task created successfully!", "Task deleted successfully!"

### Estados de Carga

- Mientras se procesan las acciones, aparece un indicador de carga
- Los botones se desactivan para evitar doble clic
- Esto previene que se creen tareas duplicadas

---

## Organización del Proyecto

El proyecto está organizado de manera que cada parte tiene una responsabilidad específica:

```
src/
├── api/                          # Conexión con el servidor
│   └── axiosClient.js            # Configuración de peticiones HTTP
│
├── features/                     # Funcionalidades de la app
│   └── tasks/                    # Todo lo relacionado con tareas
│       ├── api/
│       │   └── taskService.js    # Operaciones: crear, leer, actualizar, eliminar
│       │
│       ├── components/           # Partes visuales
│       │   ├── TaskList.jsx      # Lista de tareas con búsqueda y filtros
│       │   ├── TaskItem.jsx      # Una tarea individual
│       │   ├── TaskForm.jsx      # Formulario para crear/editar
│       │   └── DeleteConfirmModal.jsx  # Ventana de confirmación de borrado
│       │
│       ├── context/              # Almacén de datos compartidos
│       │   ├── context.js        # Definición del almacén
│       │   └── TaskContext.jsx   # Proveedor de datos a toda la app
│       │
│       ├── hooks/                # Lógica reutilizable
│       │   ├── useTaskContext.js # Acceso al almacén de datos
│       │   └── useTaskPresenter.js # Lógica de la interfaz
│       │
│       └── index.js              # Punto de acceso a la funcionalidad
│
├── App.jsx                       # Componente principal
├── main.jsx                      # Punto de entrada
└── index.css                     # Estilos visuales
```

### Explicación Simple de Cada Parte

| Carpeta/Archivo | ¿Qué hace? |
|-----------------|------------|
| **api/** | Se encarga de hablar con el servidor (pedir y enviar datos) |
| **components/** | Las piezas visuales que ves en pantalla |
| **context/** | Guarda los datos de las tareas para que toda la app pueda acceder |
| **hooks/** | Contiene la lógica de cómo funciona cada cosa |
| **App.jsx** | Une todas las piezas y muestra la aplicación |
| **index.css** | Define colores, tamaños y estilos visuales |

---

## Paleta de Colores

La aplicación usa una combinación de colores armoniosa:

| Color | Código | Uso |
|-------|--------|-----|
| **Gris Azulado Claro** | #B8B8D1 | Color principal, encabezados |
| **Púrpura Oscuro** | #5B5F97 | Textos, acentos |
| **Amarillo Dorado** | #FFC145 | Estados pendientes, advertencias |
| **Blanco Porcelana** | #FFFFFB | Fondos, tarjetas |
| **Rosa Coral** | #FF6B6C | Eliminar, errores |
| **Verde** | #4CAF50 | Completado, éxito |

---

## Comandos Disponibles

| Comando | ¿Qué hace? |
|---------|------------|
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia la aplicación en modo desarrollo |
| `npm run build` | Crea una versión lista para publicar |
| `npm run preview` | Vista previa de la versión de producción |
| `npm run lint` | Verifica errores en el código |

---

## Tecnologías Utilizadas

- **React 19** - Para construir la interfaz
- **Bootstrap 5** - Para el diseño visual
- **Axios** - Para comunicarse con el servidor
- **Vite** - Para ejecutar el proyecto rápidamente

---

## Solución de Problemas Comunes

### "No se pueden cargar las tareas"

- Verifica que el servidor backend esté corriendo en `http://localhost:3001`
- Revisa tu conexión a internet

### "La página no carga"

- Asegúrate de haber ejecutado `npm install`
- Verifica que `npm run dev` esté corriendo
- Intenta en otro navegador

### "Los cambios no se guardan"

- El servidor backend debe estar activo
- Revisa si hay mensajes de error en la aplicación
