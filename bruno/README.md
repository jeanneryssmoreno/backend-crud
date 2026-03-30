# 📡 Bruno API Client - Guía de Uso

## ¿Qué es Bruno?

Bruno es un cliente REST ligero y de código abierto similar a Postman. Perfecto para probar APIs.

## Instalación

### Opción 1: Descargar desde el sitio oficial
Visita: https://www.usebruno.com/downloads

Selecciona tu sistema operativo y descarga el instalador.

### Opción 2: Desde línea de comandos (Windows)
```powershell
choco install bruno
```

### Opción 3: Desde línea de comandos (MacOS)
```bash
brew install bruno
```

## Usar esta Colección

### 1. Abrir Bruno
- Abre la aplicación Bruno

### 2. Importar Colección
- Click en "Open Collection" o "Importar"
- Navega a la carpeta `bruno/` en tu proyecto
- Selecciona la carpeta completa

### 3. Configurar Variables

En Bruno, las variables se configuren en `bruno.json`:

```json
vars {
  base_url: http://localhost:3000
  api_url: {{base_url}}/api
}
```

Estas variables están disponibles automáticamente.

## Estructura de Endpoints

```
📁 bruno/
├── bruno.json (Configuración de la colección)
├── endpoints/
│   └── estudiantes/
│       ├── 01-GET-todos.bru           # Obtiene todos los estudiantes
│       ├── 02-GET-por-ID.bru          # Obtiene un estudiante por ID
│       ├── 03-POST-crear.bru          # Crea un nuevo estudiante
│       ├── 04-PUT-actualizar.bru      # Actualiza un estudiante
│       └── 05-DELETE-eliminar.bru     # Elimina un estudiante
```

## Cómo Usar Cada Endpoint

### 1️⃣ GET - Obtener Todos los Estudiantes

**Archivo:** `01-GET-todos.bru`

- Haz click derecha → "Send Request" o presiona `Ctrl+Enter`
- Deberías recibir un array vacío `[]` o los estudiantes existentes

**URL:** `http://localhost:3000/api/estudiantes`
**Método:** GET

### 2️⃣ POST - Crear Estudiante

**Archivo:** `03-POST-crear.bru`

1. Abre el archivo
2. Modifica el body JSON con los datos:
   ```json
   {
     "nombre": "Tu Nombre",
     "email": "email@unico.com",
     "telefono": "555-1234",
     "nivel": "Principiante",
     "especialidad": "Soprano",
     "estado": "Activo"
   }
   ```
3. Presiona `Ctrl+Enter` para enviar

**Respuesta esperada:** Status 201 + datos del estudiante creado

### 3️⃣ GET - Obtener por ID

**Archivo:** `02-GET-por-ID.bru`

1. Copia el ID de un estudiante (del POST anterior)
2. Reemplaza en la URL: `{{api_url}}/estudiantes/[tu-id-aqui]`
3. Envía la petición

### 4️⃣ PUT - Actualizar Estudiante

**Archivo:** `04-PUT-actualizar.bru`

1. Reemplaza el ID en la URL
2. Modifica los campos que quieras actualizar
3. Envía la petición

### 5️⃣ DELETE - Eliminar Estudiante

**Archivo:** `05-DELETE-eliminar.bru`

1. Reemplaza el ID en la URL
2. Envía la petición (⚠️ No se puede deshacer)

## Niveles Válidos
- Principiante
- Intermedio
- Avanzado

## Especialidades Válidas
- Soprano
- Contralto
- Tenor
- Bajo

## Estados Válidos
- Activo
- Inactivo

## Tips y Trucos

### 💾 Guardar Respuestas
Bruno guarda automáticamente el histórico de respuestas.

### 🔍 Ver Headers
Cada respuesta muestra headers, status code y body.

### 📝 Documentación
Haz click en "Docs" para ver documentación de cada endpoint.

### 🧪 Assertions
Bruno permite hacer assertions automáticas en las respuestas (ver ejemplos en los archivos .bru)

## Troubleshooting

### "Connection Refused"
- Verifica que el servidor Express está ejecutándose en puerto 3000
- En terminal: `npm run dev` desde la carpeta `backend/`

### "Invalid JSON"
- Asegúrate de que el JSON esté bien formado
- Usa herramientas online como https://jsonlint.com/ para validar

### "Email ya existe"
- Cada email debe ser único
- Cambia el email en cada petición de crear estudiante

## Próximos Pasos

Una vez que hayas probado todos los endpoints:

1. ✅ Verifica que todos retornen los códigos de estado correctos
2. ✅ Prueba con datos válidos e inválidos
3. ✅ Revisa los errores y mensajes retornados
4. ✅ Procede a crear el frontend con React

## Recursos

- 📚 Documentación Bruno: https://docs.usebruno.com/
- 🎓 REST API Basics: https://restfulapi.net/
- 💻 API Documentation: Comienza en `/api/health` para verificar que el servidor esté vivo

---

**¡Happy Testing! 🎤**
