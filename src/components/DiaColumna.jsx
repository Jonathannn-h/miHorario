import MateriaCard from './MateriaCard';

function DiaColumna({ dia, materias, onEditar, onEliminar, onMover }) {
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
    <div className="min-w-[220px] flex-1 border-r border-slate-800/80 last:border-r-0 bg-slate-950/80">
      <div className="flex h-16 items-center justify-center border-b border-slate-800/90 bg-slate-900/70 px-3 text-center text-sm font-semibold text-slate-200">
        {dia}
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="min-h-[420px] space-y-3 px-3 py-4"
      >
        {materiasDelDia.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/70 px-4 py-6 text-center text-sm text-slate-500">
            Arrastra una materia aquí
          </div>
        ) : (
          materiasDelDia.map((materia) => (
            <MateriaCard
              key={materia.id}
              materia={materia}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DiaColumna;
