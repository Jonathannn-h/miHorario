import { useEffect, useRef, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import GrillaHorario from './components/GrillaHorario';
import ModalMateria from './components/ModalMateria';
import PanelConsejos from './components/PanelConsejos';
import UndoSnackbar from './components/UndoSnackbar';
import { useMaterias } from './hooks/useMaterias';
import { DIAS } from './utils/constantes';

function leerTemaInicial() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem('miHorario:theme');
  return saved || 'dark';
}

function App() {
  const { materias, agregarMateria, editarMateria, eliminarMateria, restaurarMateria, moverMateria } = useMaterias();
  const [modalOpen, setModalOpen] = useState(false);
  const [materiaEditando, setMateriaEditando] = useState(null);
  const [lastRemoved, setLastRemoved] = useState(null);
  const [undoOpen, setUndoOpen] = useState(false);
  const [theme, setTheme] = useState(() => leerTemaInicial());
  const undoTimer = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('miHorario:theme', theme);
    return () => {
      if (undoTimer.current) clearTimeout(undoTimer.current);
    };
  }, [theme]);

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
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pageWidth = 842;
      const pageHeight = 595;
      const margin = 40;
      const headerHeight = 50;
      const colWidth = (pageWidth - margin * 2) / DIAS.length;
      const rowHeight = 80;
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      /*page.drawText('Horario Semanal', {
        x: margin,
        y: pageHeight - margin - 24,
        size: 20,
        font,
        color: rgb(0.04, 0.12, 0.25),
      });*/

      DIAS.forEach((dia, index) => {
        const x = margin + index * colWidth;
        page.drawText(dia, {
          x: x + 8,
          y: pageHeight - margin - headerHeight,
          size: 12,
          font,
          color: rgb(0.04, 0.12, 0.25),
        });
      });

      const materiasPorDia = DIAS.map((dia) =>
        materias
          .filter((materia) => materia.dia === dia)
          .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
      );

      materiasPorDia.forEach((lista, dayIndex) => {
        const x = margin + dayIndex * colWidth;
        lista.forEach((materia, materiaIndex) => {
          const y = pageHeight - margin - headerHeight - 24 - materiaIndex * (rowHeight + 10);
          const boxHeight = Math.min(rowHeight, y - margin);
          page.drawRectangle({
            x: x + 4,
            y: y - boxHeight,
            width: colWidth - 8,
            height: boxHeight,
            color: rgb(0.12, 0.18, 0.32),
            borderColor: rgb(0.55, 0.65, 0.95),
            borderWidth: 1,
          });
          page.drawText(`${materia.nombre}`, {
            x: x + 12,
            y: y - 22,
            size: 11,
            font,
            color: rgb(0.95, 0.95, 0.95),
          });
          page.drawText(`${materia.aula} · ${materia.seccion}`, {
            x: x + 12,
            y: y - 36,
            size: 9,
            font,
            color: rgb(0.75, 0.85, 0.95),
          });
          page.drawText(`${materia.horaInicio} - ${materia.horaFin}`, {
            x: x + 12,
            y: y - 50,
            size: 9,
            font,
            color: rgb(0.75, 0.85, 0.95),
          });
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'horario.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('No se pudo descargar el PDF. Revisa la consola para más detalles.');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-100' : 'bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#e0f2fe_45%,_#f8fafc_100%)] text-slate-800'}`}>
      <header className={`${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'} border-b px-6 py-8 shadow-[0_20px_60px_rgba(2,6,23,0.15)] backdrop-blur`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`mb-2 text-sm uppercase tracking-[0.35em] ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>App: miHorario</p>
            <h1 className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>Horario Semanal</h1>
            <p className={`mt-2 max-w-2xl text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>JH</p>
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            <button
              onClick={toggleTheme}
              className={`w-full md:w-auto rounded-2xl border px-4 py-2.5 font-medium transition ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-100 hover:bg-slate-700/90' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            >
              {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
            </button>
            <button
              onClick={abrirCrear}
              className={`w-full md:w-auto rounded-2xl border px-4 py-2.5 font-medium transition ${isDark ? 'border-sky-400/40 bg-sky-500/15 text-sky-200 hover:bg-sky-500/25' : 'border-sky-300 bg-sky-100 text-sky-800 hover:bg-sky-200'}`}
            >
              + Nueva materia
            </button>
            <button
              onClick={descargarHorarioPdf}
              className={`w-full md:w-auto rounded-2xl border px-4 py-2.5 font-medium transition ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-100 hover:bg-slate-700/90' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            >
              Descargar PDF
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PanelConsejos materias={materias} isDark={isDark} />
        <div className={`overflow-hidden rounded-[28px] border shadow-[0_25px_80px_rgba(2,6,23,0.15)] ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
          <GrillaHorario
            materias={materias}
            onEditar={abrirEditar}
            onEliminar={handleEliminar}
            onMover={moverMateria}
            onCrear={abrirCrear}
            isDark={isDark}
          />
        </div>
      </main>

      <ModalMateria
        open={modalOpen}
        onClose={cerrarModal}
        materia={materiaEditando}
        onSubmit={guardarMateria}
        isDark={isDark}
      />

      <UndoSnackbar
        open={undoOpen}
        message="Materia eliminada"
        onUndo={handleUndo}
        onClose={handleCloseUndo}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
