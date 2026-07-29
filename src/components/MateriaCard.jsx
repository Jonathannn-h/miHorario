import { useState } from 'react';
import { formatHora, horaEnMinutos } from '../utils/formato';
import { PALETA } from '../utils/constantes';

function MateriaCard({ materia, onEditar, onEliminar }) {
  const [dragging, setDragging] = useState(false);
  const colorClass = PALETA[Math.abs(materia.nombre.length + materia.profesor.length) % PALETA.length];

  const durationMinutes = horaEnMinutos(materia.horaFin) - horaEnMinutos(materia.horaInicio);
  const height = Math.max(64, Math.round((durationMinutes / 60) * 80 - 8));

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', materia.id);
    setDragging(true);
  };

  const onDragEnd = () => setDragging(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`absolute inset-x-2 top-1 z-10 rounded-2xl border border-white/10 bg-gradient-to-br ${colorClass} p-3 text-xs shadow-[0_8px_24px_rgba(15,23,42,0.25)] ${dragging ? 'opacity-60' : 'opacity-100'}`}
      style={{ height }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{materia.nombre}</p>
          <p className="text-[11px] text-slate-100/90">{materia.profesor}</p>
        </div>
        <div className="flex gap-1">
          <button className="rounded bg-white/20 px-1.5 py-0.5" onClick={(e) => { e.stopPropagation(); onEditar(materia); }}>✎</button>
          <button className="rounded bg-white/20 px-1.5 py-0.5" onClick={(e) => { e.stopPropagation(); onEliminar(materia.id); }}>🗑</button>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-100/90">{materia.aula} · {materia.seccion}</p>
      <p className="mt-1 text-[11px] text-slate-100/90">{formatHora(materia.horaInicio)} - {formatHora(materia.horaFin)}</p>
    </div>
  );
}

export default MateriaCard;
