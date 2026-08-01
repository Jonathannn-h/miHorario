import MateriaCard from './MateriaCard';

function DiaColumna({ dia, materias, onEditar, onEliminar, onMover, isToday, isDark = false }) {
  const materiasDelDia = materias
    .filter((materia) => materia.dia === dia)
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    onMover(id, dia);
  };

  return (
    <div className={`w-full border-r last:border-r-0 ${isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-slate-50/90'}`}>
      <div className={`flex h-14 items-center justify-center border-b px-3 text-center text-sm font-semibold ${isToday ? (isDark ? 'border-sky-400/50 bg-slate-800/90 text-sky-200' : 'border-sky-400/50 bg-sky-100 text-sky-700') : (isDark ? 'border-slate-800/90 bg-slate-900/70 text-slate-200' : 'border-slate-200 bg-white/70 text-slate-700')}`}>
        {dia}
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="min-h-[220px] space-y-3 px-3 py-4"
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
              isDark={isDark}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DiaColumna;
