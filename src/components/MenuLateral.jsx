import { useEffect, useState } from 'react';
import { Menu, X, ClipboardList, CalendarDays, BookOpen } from 'lucide-react';

const OPCIONES = [
  { id: 'asistencias', label: 'Asistencias', icon: ClipboardList },
  { id: 'horario', label: 'Horario', icon: CalendarDays },
  { id: 'materias', label: 'Materias', icon: BookOpen },
];

function MenuLateral({ vistaActual = 'horario', onNavegar, isDark = false }) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setAbierto(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierto]);

  const seleccionarOpcion = ({ id, navegable }) => {
    if (navegable !== false && onNavegar) onNavegar(id);
    setAbierto(false);
  };

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        aria-label="Abrir menú"
        className={`fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur transition hover:scale-105 ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-100 hover:bg-slate-700/90' : 'border-slate-200 bg-white/80 text-slate-800 hover:bg-slate-100'}`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {abierto && (
        <div
          onClick={() => setAbierto(false)}
          className={`fixed inset-0 z-50 backdrop-blur-sm ${isDark ? 'bg-slate-950/60' : 'bg-slate-900/30'}`}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-72 max-w-[85vw] flex-col border-r shadow-[0_25px_80px_rgba(2,6,23,0.35)] backdrop-blur transition-transform duration-300 ${abierto ? 'translate-x-0' : '-translate-x-full'} ${isDark ? 'border-slate-800/80 bg-slate-900/95' : 'border-slate-200 bg-white/95'}`}
      >
        <div className="flex items-center justify-between border-b px-5 py-5">
          <div>
            <p className={`text-sm font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>miHorario</p>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Menú</p>
          </div>
          <button
            onClick={() => setAbierto(false)}
            aria-label="Cerrar menú"
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-300 hover:bg-slate-700/90' : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {OPCIONES.map((opcion) => {
            const { id, label, icon: Icon } = opcion;
            const activa = vistaActual === id;
            return (
              <button
                key={id}
                onClick={() => seleccionarOpcion(opcion)}
                className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${activa ? (isDark ? 'bg-sky-500/15 text-sky-200' : 'bg-sky-100 text-sky-800') : isDark ? 'text-slate-200 hover:bg-slate-800/80' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                <Icon className={`h-5 w-5 ${isDark ? 'text-sky-300' : 'text-sky-700'}`} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className={`border-t px-5 py-4 text-xs ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
          App: miHorario · JH
        </div>
      </aside>
    </>
  );
}

export default MenuLateral;
