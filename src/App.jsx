import { useState } from 'react';
import GrillaHorario from './components/GrillaHorario';
import ModalMateria from './components/ModalMateria';
import { useMaterias } from './hooks/useMaterias';

function App() {
  const { materias, agregarMateria, editarMateria, eliminarMateria, moverMateria } = useMaterias();
  const [modalOpen, setModalOpen] = useState(false);
  const [materiaEditando, setMateriaEditando] = useState(null);

  const abrirCrear = () => {
    setMateriaEditando(null);
    setModalOpen(true);
  };

  const abrirEditar = (materia) => {
    setMateriaEditando(materia);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setMateriaEditando(null);
  };

  const guardarMateria = (data) => {
    if (materiaEditando) {
      editarMateria(materiaEditando.id, data);
    } else {
      agregarMateria(data);
    }
    cerrarModal();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-900/70 px-6 py-8 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-sky-300">App: miHorario</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50">Horario Semanal</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">JH</p>
          </div>
          <button
            onClick={abrirCrear}
            className="w-full md:w-auto rounded-2xl border border-sky-400/40 bg-sky-500/15 px-4 py-2.5 font-medium text-sky-200 transition hover:bg-sky-500/25"
          >
            + Nueva materia
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <GrillaHorario
          materias={materias}
          onEditar={abrirEditar}
          onEliminar={eliminarMateria}
          onMover={moverMateria}
        />
      </main>

      <ModalMateria
        open={modalOpen}
        onClose={cerrarModal}
        materia={materiaEditando}
        onSubmit={guardarMateria}
      />
    </div>
  );
}

export default App;
