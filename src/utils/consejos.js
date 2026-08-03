import { DIAS } from './constantes';
import { horaEnMinutos } from './formato';

const HORA_INICIO_DIA = horaEnMinutos('07:00');
const HORA_FIN_DIA = horaEnMinutos('22:00');

function obtenerDuracionMinutos(materia) {
  return horaEnMinutos(materia.horaFin) - horaEnMinutos(materia.horaInicio);
}

function hayChoque(a, b) {
  return horaEnMinutos(a.horaInicio) < horaEnMinutos(b.horaFin) && horaEnMinutos(b.horaInicio) < horaEnMinutos(a.horaFin);
}

export function calcularConsejos(materias = []) {
  const materiasPorDia = DIAS.map((dia) => {
    const items = (materias || [])
      .filter((materia) => materia.dia === dia)
      .map((materia) => ({ ...materia }))
      .sort((a, b) => horaEnMinutos(a.horaInicio) - horaEnMinutos(b.horaInicio));

    return { dia, materias: items };
  });

  const choques = [];

  materiasPorDia.forEach(({ dia, materias }) => {
    for (let i = 0; i < materias.length; i += 1) {
      for (let j = i + 1; j < materias.length; j += 1) {
        const a = materias[i];
        const b = materias[j];

        if (!hayChoque(a, b)) continue;

        const inicioSolape = Math.max(horaEnMinutos(a.horaInicio), horaEnMinutos(b.horaInicio));
        const finSolape = Math.min(horaEnMinutos(a.horaFin), horaEnMinutos(b.horaFin));

        choques.push({
          dia,
          materiaA: a.nombre,
          materiaB: b.nombre,
          inicioSolape,
          finSolape,
          duracionMinutos: finSolape - inicioSolape,
        });
      }
    }
  });

  const cargas = materiasPorDia.map(({ dia, materias }) => ({
    dia,
    totalMinutos: materias.reduce((total, materia) => total + obtenerDuracionMinutos(materia), 0),
  }));

  const diaMasCargado = cargas.reduce(
    (max, actual) => (actual.totalMinutos > max.totalMinutos ? actual : max),
    { dia: null, totalMinutos: 0 }
  );

  const huecosLibres = materiasPorDia.flatMap(({ dia, materias }) => {
    const ordenadas = [...materias].sort((a, b) => horaEnMinutos(a.horaInicio) - horaEnMinutos(b.horaInicio));

    if (ordenadas.length === 0) {
      return [{ dia, inicio: HORA_INICIO_DIA, fin: HORA_FIN_DIA, duracionMinutos: HORA_FIN_DIA - HORA_INICIO_DIA }];
    }

    const gaps = [];

    if (horaEnMinutos(ordenadas[0].horaInicio) > HORA_INICIO_DIA) {
      gaps.push({ dia, inicio: HORA_INICIO_DIA, fin: horaEnMinutos(ordenadas[0].horaInicio), duracionMinutos: horaEnMinutos(ordenadas[0].horaInicio) - HORA_INICIO_DIA });
    }

    for (let i = 1; i < ordenadas.length; i += 1) {
      const anterior = ordenadas[i - 1];
      const actual = ordenadas[i];
      const inicioAnterior = horaEnMinutos(anterior.horaFin);
      const inicioActual = horaEnMinutos(actual.horaInicio);

      if (inicioActual > inicioAnterior) {
        gaps.push({ dia, inicio: inicioAnterior, fin: inicioActual, duracionMinutos: inicioActual - inicioAnterior });
      }
    }

    const ultima = ordenadas[ordenadas.length - 1];
    if (horaEnMinutos(ultima.horaFin) < HORA_FIN_DIA) {
      gaps.push({ dia, inicio: horaEnMinutos(ultima.horaFin), fin: HORA_FIN_DIA, duracionMinutos: HORA_FIN_DIA - horaEnMinutos(ultima.horaFin) });
    }

    return gaps;
  });

  return {
    choques,
    diaMasCargado,
    huecosLibres,
    cargas,
  };
}
