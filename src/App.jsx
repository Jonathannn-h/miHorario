import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
import GrillaHorario from './components/GrillaHorario';
import ModalMateria from './components/ModalMateria';
import UndoSnackbar from './components/UndoSnackbar';
import { useMaterias } from './hooks/useMaterias';

function App() {
  const { materias, agregarMateria, editarMateria, eliminarMateria, restaurarMateria, moverMateria } = useMaterias();
  const [modalOpen, setModalOpen] = useState(false);
  const [materiaEditando, setMateriaEditando] = useState(null);
  const [lastRemoved, setLastRemoved] = useState(null);
  const [undoOpen, setUndoOpen] = useState(false);
  const undoTimer = useRef(null);
  const horarioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (undoTimer.current) clearTimeout(undoTimer.current);
    };
  }, []);

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

  const handleEliminar = (materia) => {
    eliminarMateria(materia);
    setLastRemoved(materia);
    setUndoOpen(true);
    if (undoTimer.current) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => {
      setUndoOpen(false);
      setLastRemoved(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (!lastRemoved) return;
    restaurarMateria(lastRemoved);
    setUndoOpen(false);
    setLastRemoved(null);
    if (undoTimer.current) clearTimeout(undoTimer.current);
  };

  const handleCloseUndo = () => {
    setUndoOpen(false);
    setLastRemoved(null);
    if (undoTimer.current) clearTimeout(undoTimer.current);
  };

  const descargarHorarioPdf = async () => {
    if (!horarioRef.current) return;

    const canvas = await html2canvas(horarioRef.current, {
      scale: 2,
      backgroundColor: '#020617',
      useCORS: true,
    });

    const pngDataUrl = canvas.toDataURL('image/png');
    const pngImageBytes = await fetch(pngDataUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    const pdfPage = pdfDoc.addPage([canvas.width, canvas.height]);

    pdfPage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'horario.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            <button
              onClick={abrirCrear}
              className="w-full md:w-auto rounded-2xl border border-sky-400/40 bg-sky-500/15 px-4 py-2.5 font-medium text-sky-200 transition hover:bg-sky-500/25"
            >
              + Nueva materia
            </button>
            <button
              onClick={descargarHorarioPdf}
              className="w-full md:w-auto rounded-2xl border border-slate-700/70 bg-slate-800/80 px-4 py-2.5 font-medium text-slate-100 transition hover:bg-slate-700/90"
            >
              Descargar PDF
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div ref={horarioRef} className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/70 shadow-[0_25px_80px_rgba(2,6,23,0.35)]">
          <GrillaHorario
            materias={materias}
            onEditar={abrirEditar}
            onEliminar={handleEliminar}
            onMover={moverMateria}
          />
        </div>
      </main>

      <ModalMateria
        open={modalOpen}
        onClose={cerrarModal}
        materia={materiaEditando}
        onSubmit={guardarMateria}
      />

      <UndoSnackbar
        open={undoOpen}
        message="Materia eliminada"
        onUndo={handleUndo}
        onClose={handleCloseUndo}
      />
    </div>
  );
}

export default App;
