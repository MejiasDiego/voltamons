# Excel MCP Guide

## Descripción

Skill para utilizar el servidor Excel MCP con cualquier agente de IA. Este servidor permite leer y escribir datos en archivos Microsoft Excel a través del protocolo MCP.

## Requisitos Previos

- Cliente MCP compatible (OpenCode, Claude Desktop, Cursor, etc.)
- Node.js 20.x o superior
- Sistema operativo: Windows (para todas las funciones), macOS/Linux (solo lectura/escritura)
- Archivos Excel en formato soportado: XLSX, XLSM, XLTX, XLTM

## Herramientas Disponibles

### read_sheet_names

Lista todos los nombres de las hojas de un archivo Excel.

**Parámetros:**
- `fileAbsolutePath` (requerido): Ruta absoluta al archivo Excel

**Ejemplo de uso:**
```
"Lee los sheet names del archivo C:\Users\diego\Desktop\proyecto\data.xlsx"
```

---

### read_sheet_data

Lee datos de una hoja de Excel con paginación.

**Parámetros:**
- `fileAbsolutePath` (requerido): Ruta absoluta al archivo Excel
- `sheetName` (requerido): Nombre de la hoja
- `range` (opcional): Rango de celdas (ej. "A1:C10"). Por defecto usa la primera hoja
- `knownPagingRanges` (opcional): Lista de rangos de paginación ya leídos
- `showFormula` (opcional): Mostrar fórmulas en lugar de valores
- `showStyle` (opcional): Incluir información de estilo

**Ejemplo de uso:**
```
"Lee los datos de la hoja 'Ventas' del archivo data.xlsx"
"Lee el rango A1:D50 de la hoja 'Resumen'"
```

---

### write_sheet_data

Escribe datos en una hoja de Excel.

**Parámetros:**
- `fileAbsolutePath` (requerido): Ruta absoluta al archivo Excel
- `sheetName` (requerido): Nombre de la hoja
- `range` (requerido): Rango de celdas destino (ej. "A1:C10")
- `values` (requerido): Matriz de valores a escribir
- `newSheet` (opcional): Crear nueva hoja si no existe

**Ejemplo de uso:**
```
"Escribe los siguientes datos en la hoja 'Resultados' del archivo output.xlsx:
| Producto | Cantidad | Precio |
|----------|----------|--------|
| Manzanas | 100      | 1.50   |
| Naranjas | 50       | 2.00   |"
```

---

### read_sheet_image

Lee datos como imagen de una hoja de Excel (solo Windows).

**Parámetros:**
- `fileAbsolutePath` (requerido): Ruta absoluta al archivo Excel
- `sheetName` (requerido): Nombre de la hoja
- `range` (opcional): Rango de celdas
- `knownPagingRanges` (opcional): Lista de rangos ya leídos

**Ejemplo de uso:**
```
"Captura la pantalla de la hoja 'Gráficos' del archivo informe.xlsx"
```

---

## Configuración del Servidor

### Variables de Entorno

- `EXCEL_MCP_PAGING_CELLS_LIMIT`: Número máximo de celdas a leer en una operación de paginación (por defecto: 4000)

### Configuración en OpenCode

```json
{
  "mcp": {
    "excel": {
      "type": "local",
      "command": ["cmd", "/c", "npx", "--yes", "@negokaz/excel-mcp-server"],
      "environment": {
        "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000"
      },
      "enabled": true
    }
  }
}
```

## Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `File not found` | La ruta del archivo es incorrecta | Verificar que la ruta absoluta sea correcta |
| `Range outside used range` | El rango especificado supera los datos existentes | Usar un rango más pequeño o dejar que el servidor detecte automáticamente |
| `No range available to read` | La hoja está vacía o no tiene datos | Verificar que la hoja contenga datos, o usar rango específico |
| `Sheet not found` | El nombre de la hoja no existe | Usar `read_sheet_names` primero para ver los nombres disponibles |

## Recomendaciones de Uso

1. **Siempre empezar por `read_sheet_names`** para conocer la estructura del archivo
2. **Usar rangos específicos** para archivos grandes (ej. A1:E100 en lugar de整个 hoja)
3. **Manejar paginación** para hojas con muchos datos: el servidor puede dividir la lectura en varios rangos
4. **Verificar permisos de escritura** antes de usar `write_sheet_data`
5. **Hacer backup** de archivos importantes antes de modificarlos

## Formato de Datos para Escritura

Los datos se pasan como matriz 2D (array de arrays):

```json
{
  "values": [
    ["Encabezado 1", "Encabezado 2", "Encabezado 3"],
    ["Fila 1 Col 1", "Fila 1 Col 2", "Fila 1 Col 3"],
    ["Fila 2 Col 1", "Fila 2 Col 2", "Fila 2 Col 3"]
  ]
}
```

## Notas Adicionales

- El servidor usa el backend `excelize` para archivos XLSX y `ole` para archivos más antiguos
- La característica de captura de pantalla solo está disponible en Windows
- El límite de paginación puede ajustarse según las necesidades del proyecto