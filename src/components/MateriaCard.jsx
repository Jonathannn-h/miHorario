import { useState } from 'react';
import { formatHora } from '../utils/formato';
import ConfirmDialog from './ConfirmDialog';

function MateriaCard({ materia, onEditar, onEliminar, isDark = false }) {
  const [dragging, setDragging] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [dropPulse, setDropPulse] = useState(false);
  const cardStyle = {
    background: `linear-gradient(135deg, ${materia.color || '#60a5fa'} 0%, ${materia.color || '#60a5fa'}cc 100%)`,
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', materia.id);
    e.dataTransfer.effectAllowed = 'move';
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
    setDropPulse(true);
    window.setTimeout(() => setDropPulse(false), 220);
  };

  return (
    <div className="relative group">
      <div className={`pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-md px-2 py-1 text-xs shadow-md transition-opacity duration-150 group-hover:block ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-700 text-slate-100'}`}>
        Arrastra para mover a otro día
      </div>

      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title="Arrastra para mover a otro día"
        className={`w-full rounded-3xl border border-white/10 p-4 text-sm shadow-[0_8px_24px_rgba(15,23,42,0.25)] ${dragging ? 'opacity-60' : 'opacity-100'} cursor-grab transition-all duration-300 ${dropPulse ? 'scale-[1.01] translate-y-[-2px]' : ''} ${removing ? 'animate-fade-out scale-95 opacity-0' : ''}`}
        style={cardStyle}
      >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-base font-semibold ${isDark ? 'text-slate-950' : 'text-slate-900'}`}>{materia.nombre}</p>
          <p className={`mt-1 text-xs ${isDark ? 'text-slate-950/80' : 'text-slate-800/80'}`}>{materia.profesor}</p>
        </div>
        <div className="flex gap-1">
          <button className={`rounded-full px-2 py-1 text-xs ${isDark ? 'bg-white/70 text-slate-950' : 'bg-slate-900/10 text-slate-900'}`} onClick={(e) => { e.stopPropagation(); onEditar(materia); }}>Editar</button>
          <button className={`rounded-full px-2 py-1 text-xs ${isDark ? 'bg-white/70 text-slate-950' : 'bg-slate-900/10 text-slate-900'}`} onClick={(e) => { e.stopPropagation(); setConfirmOpen(true); }}>Borrar</button>
        </div>
      </div>
      <div className={`mt-3 space-y-1 text-[11px] ${isDark ? 'text-slate-950/80' : 'text-slate-800/80'}`}>
        <p>{materia.aula} · {materia.seccion}</p>
        <p>{formatHora(materia.horaInicio)} - {formatHora(materia.horaFin)}</p>
      </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar eliminación"
        message={`¿Seguro que quieres eliminar ${materia.nombre}?`}
        onConfirm={() => {
          setRemoving(true);
          setConfirmOpen(false);
          setTimeout(() => onEliminar(materia), 260);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default MateriaCard;
