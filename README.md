# miHorario

Aplicación web para organizar y dar seguimiento a tu horario semanal de clases.

## Funcionalidades

### Horario semanal
- Grilla visual de Lunes a Sábado con drag and drop para mover materias entre días
- Crear, editar, duplicar y eliminar materias
- Selector de modo claro / oscuro
- Descargar horario en PDF

### Asistencias
- Registro de asistencia por clase con 3 estados: Asistió, Faltó, No hubo clase
- Las clases marcadas como "No hubo clase" se excluyen del cálculo del porcentaje
- Nota opcional al marcar "No hubo clase" (ej. feriado, profesor ausente)
- Navegador de días para ir saltando de un día a otro
- Botones rápidos para marcar todas las clases de un día de una sola vez
- Resumen de asistencia global y por materia (agrupado por nombre)
- Rango de fechas configurable con persistencia en localStorage

### Materias
- Vista de todas las materias agrupadas por nombre con datos principales
- Vista de tarjetas en mobile, tabla en desktop
- Búsqueda por nombre, profesor o aula
- Ordenar por columnas: materia, profesor, aula, sección
- Click en una fila para ver el horario semanal de esa materia en un modal
- Editar datos compartidos de todos los días de una materia
- Navegación rápida a la grilla desde el modal

### Paneles y utilidades
- Panel de consejos: choques de horario, día más cargado, huecos libres
- Menú lateral con navegación entre secciones
- Persistencia de datos con localStorage

## Ejecución

```bash
npm install
npm run dev
```
