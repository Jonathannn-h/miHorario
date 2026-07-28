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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 px-6 py-6 shadow-lg shadow-slate-950/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">miHorario</p>
            <h1 className="text-3xl font-semibold">Tu horario semanal en una sola vista</h1>
          </div>
          <button
            onClick={abrirCrear}
            className="rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
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
