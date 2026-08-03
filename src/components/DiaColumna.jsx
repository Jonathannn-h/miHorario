import { useState } from 'react';
import MateriaCard from './MateriaCard';

function DiaColumna({ dia, materias, onEditar, onEliminar, onDuplicar, onMover, isToday, isDark = false }) {
  const [isActive, setIsActive] = useState(false);
  const materiasDelDia = materias
    .filter((materia) => materia.dia === dia)
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

  const handleDrop = (e) => {
    e.preventDefault();
    setIsActive(false);
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    onMover(id, dia);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsActive(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsActive(false);
  };

  return (
    <div className={`flex min-h-[420px] w-full flex-col border-r last:border-r-0 transition-all duration-200 ${isActive ? (isDark ? 'border-sky-400/60 bg-slate-900/95 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.35)]' : 'border-sky-400/60 bg-sky-50/95 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.35)]') : (isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-slate-50/90')}`}>
      <div className={`flex h-14 items-center justify-between border-b px-3 text-sm font-semibold transition-colors duration-200 ${isActive ? (isDark ? 'border-sky-400/50 bg-sky-500/15 text-sky-200' : 'border-sky-400/50 bg-sky-200 text-sky-800') : (isToday ? (isDark ? 'border-sky-400/50 bg-slate-800/90 text-sky-200' : 'border-sky-400/50 bg-sky-100 text-sky-700') : (isDark ? 'border-slate-800/90 bg-slate-900/70 text-slate-200' : 'border-slate-200 bg-white/70 text-slate-700'))}`}>
        <span className="truncate">{dia}</span>
        <span className={`ml-2 inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ${isToday ? (isDark ? 'bg-sky-400/20 text-sky-200' : 'bg-sky-200 text-sky-800') : (isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-200 text-slate-700')}`}>
          {materiasDelDia.length}
        </span>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex-1 space-y-4 px-3 py-5 transition-colors duration-200 ${isActive ? (isDark ? 'bg-sky-500/10' : 'bg-sky-100/70') : ''}`}
      >
        {materiasDelDia.length === 0 ? (
          <div className={`rounded-3xl border border-dashed px-4 py-6 text-center text-sm ${isDark ? 'border-slate-700/80 bg-slate-900/70 text-slate-500' : 'border-slate-300 bg-slate-100/80 text-slate-500'}`}>
            Arrastra una materia aquí
          </div>
        ) : (
          materiasDelDia.map((materia) => (
            <MateriaCard
              key={materia.id}
              materia={materia}
              onEditar={onEditar}
              onEliminar={onEliminar}
              onDuplicar={onDuplicar}
              isDark={isDark}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DiaColumna;
