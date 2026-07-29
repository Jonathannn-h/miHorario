import { useMemo } from 'react';
import MateriaCard from './MateriaCard';
import { HORA_FIN, HORA_INICIO } from '../utils/constantes';
import { horaEnMinutos } from '../utils/formato';

function DiaColumna({ dia, materias, onEditar, onEliminar, onMover }) {
  const horas = useMemo(() => Array.from({ length: HORA_FIN - HORA_INICIO + 1 }, (_, i) => HORA_INICIO + i), []);
  const materiasDelDia = materias.filter((materia) => materia.dia === dia);

  const handleDrop = (e, horaLabel) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;

    const materia = materias.find((item) => item.id === id);
    if (!materia) return;

    const durationMinutes = horaEnMinutos(materia.horaFin) - horaEnMinutos(materia.horaInicio);
    const fin = `${String(Number(horaLabel.split(':')[0]) + Math.max(1, durationMinutes / 60)).padStart(2, '0')}:00`;
    onMover(id, dia, horaLabel, fin);
  };

  return (
    <div className="min-w-[180px] flex-1 border-r border-slate-800/80 last:border-r-0">
      <div className="flex h-14 items-center justify-center border-b border-slate-800/90 bg-slate-900/70 text-sm font-semibold text-slate-200">
        {dia}
      </div>
      {horas.map((hora) => {
        const horaLabel = `${String(hora).padStart(2, '0')}:00`;
        const materiasEnHora = materiasDelDia.filter((materia) => materia.horaInicio === horaLabel);

        return (
          <div
            key={`${dia}-${hora}`}
            onDrop={(e) => handleDrop(e, horaLabel)}
            onDragOver={(e) => e.preventDefault()}
            className="relative h-20 border-b border-slate-800/90 bg-[linear-gradient(180deg,_rgba(15,23,42,0.55),_rgba(2,6,23,0.75))]"
          >
            {materiasEnHora.map((materia) => (
              <MateriaCard
                key={materia.id}
                materia={materia}
                onEditar={onEditar}
                onEliminar={onEliminar}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default DiaColumna;
