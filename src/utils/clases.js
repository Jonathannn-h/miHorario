import { DIAS } from './constantes';

export function generarClases(materias, fechaInicio, fechaFin) {
  if (!fechaInicio || !fechaFin || !materias.length) return [];

  const inicio = new Date(`${fechaInicio}T00:00:00`);
  const fin = new Date(`${fechaFin}T00:00:00`);
  if (inicio > fin) return [];

  const clases = [];
  const actual = new Date(inicio);

  while (actual <= fin) {
    const diaNombre = DIAS[actual.getDay() - 1];
    if (diaNombre) {
      materias
        .filter((materia) => materia.dia === diaNombre)
        .forEach((materia) => {
          clases.push({
            id: `${materia.id}-${actual.toISOString().slice(0, 10)}`,
            materiaId: materia.id,
            materia: materia.nombre,
            profesor: materia.profesor,
            aula: materia.aula,
            seccion: materia.seccion,
            color: materia.color,
            dia: diaNombre,
            fecha: actual.toISOString().slice(0, 10),
            horaInicio: materia.horaInicio,
            horaFin: materia.horaFin,
          });
        });
    }
    actual.setDate(actual.getDate() + 1);
  }

  clases.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horaInicio.localeCompare(b.horaInicio));
  return clases;
}
