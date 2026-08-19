# Horario de Clases

Aplicación web para organizar tu horario de clases, llevar el control de asistencias y gestionar tus materias — pensada para estudiantes universitarios que necesitan tener todo en un solo lugar.

> Proyecto personal de práctica, enfocado en diseño de interfaz e interacción (drag and drop, modo claro/oscuro, exportación a PDF).

## Características

### Horario (grilla principal)
- Grilla semanal (Lunes a Sábado) con tarjetas de materias por día
- **Drag and drop** para mover materias entre días
- Crear, editar, duplicar y eliminar materias
- Selector de color por materia, con contraste de texto garantizado
- Modo claro / oscuro
- Descarga del horario en **PDF**
- Panel de **Consejos**: detecta choques de horario, señala el día más cargado y muestra los huecos libres
- Diseño responsivo (mobile / desktop)
- Confirmación antes de eliminar, con opción de deshacer

### Asistencias
- Definí el rango de fechas de tu semestre
- Marcá cada clase como **Asistió / Faltó / No hubo clase**
- Las clases sin dictarse (feriados, ausencia del profesor) no afectan el porcentaje
- Resumen de asistencia por materia y resumen global
- Navegador de días (anterior/siguiente, ir a una fecha, volver a "Hoy")

### Materias
- Tabla de todas las materias, con vista de tarjetas en mobile
- Búsqueda por nombre, profesor o aula
- Ordenamiento por columnas
- Vista rápida de la mini-grilla semanal de cada materia
- Edición de datos compartidos (profesor, aula, sección, color) para todos los días de esa materia

## Tecnologías

- **React** + **Vite**
- **Tailwind CSS**
- Drag and drop nativo (HTML5 Drag and Drop API)
- `localStorage` para persistencia de datos en el navegador

## Instalación

```bash
git clone https://github.com/tu-usuario/horario-clases.git
cd horario-clases
npm install
npm run dev
```

La app va a estar disponible en `http://localhost:3000` (o el puerto que indique Vite).

## Estructura del proyecto

```
horario-clases/
├── src/
│   ├── components/     # Componentes de UI (grilla, tarjetas, modales, etc.)
│   ├── hooks/          # Lógica de estado y persistencia
│   ├── utils/          # Constantes, formateo, cálculos (estados de clase, etc.)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── tailwind.config.js
```


