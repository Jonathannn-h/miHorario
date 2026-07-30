import { useState } from 'react';
import { formatHora } from '../utils/formato';

function MateriaCard({ materia, onEditar, onEliminar }) {
  const [dragging, setDragging] = useState(false);
  const cardStyle = {
    background: `linear-gradient(135deg, ${materia.color || '#60a5fa'} 0%, ${materia.color || '#60a5fa'}cc 100%)`,
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', materia.id);
    e.dataTransfer.effectAllowed = 'move';
    setDragging(true);
  };

  const onDragEnd = () => setDragging(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`w-full rounded-3xl border border-white/10 p-4 text-sm shadow-[0_8px_24px_rgba(15,23,42,0.25)] ${dragging ? 'opacity-60' : 'opacity-100'} cursor-grab`}
      style={cardStyle}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-slate-950">{materia.nombre}</p>
          <p className="mt-1 text-xs text-slate-950/80">{materia.profesor}</p>
        </div>
        <div className="flex gap-1">
          <button className="rounded-full bg-white/70 px-2 py-1 text-xs text-slate-950" onClick={(e) => { e.stopPropagation(); onEditar(materia); }}>Editar</button>
          <button className="rounded-full bg-white/70 px-2 py-1 text-xs text-slate-950" onClick={(e) => { e.stopPropagation(); onEliminar(materia.id); }}>Borrar</button>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-[11px] text-slate-950/80">
        <p>{materia.aula} · {materia.seccion}</p>
        <p>{formatHora(materia.horaInicio)} - {formatHora(materia.horaFin)}</p>
      </div>
    </div>
  );
}

export default MateriaCard;
