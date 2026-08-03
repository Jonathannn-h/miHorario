import { DIAS } from '../utils/constantes';
import DiaColumna from './DiaColumna';

function obtenerDiaActual() {
  const dias = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
  };
  return dias[new Date().getDay()] || null;
}

function GrillaHorario({ materias, onEditar, onEliminar, onDuplicar, onMover, onCrear, isDark = false }) {
  const diaActual = obtenerDiaActual();

  if (materias.length === 0) {
    return (
      <div className={`rounded-[28px] border px-6 py-12 shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full ${isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-100 text-sky-700'}`}>
            <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="12" y="14" width="40" height="36" rx="8" />
              <path d="M20 24h24" />
              <path d="M20 32h16" />
              <path d="M20 40h10" />
              <circle cx="44" cy="40" r="6" />
              <path d="M44 36v8" />
              <path d="M40 40h8" />
            </svg>
          </div>
          <h2 className={`text-2xl font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>Tu semana todavía está vacía</h2>
          <p className={`mt-3 max-w-lg text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Crea tu primera materia para empezar a organizar clases, profesores, aulas y horarios de forma visual.
          </p>
          <button
            onClick={onCrear}
            className={`mt-8 rounded-2xl border px-5 py-3 text-base font-semibold transition ${isDark ? 'border-sky-400/40 bg-sky-500/15 text-sky-200 hover:bg-sky-500/25' : 'border-sky-300 bg-sky-100 text-sky-800 hover:bg-sky-200'}`}
          >
            Crear tu primera materia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[28px] border px-2 py-3 shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
      <div className="grid grid-cols-1 gap-4 px-3 py-2 w-full md:grid-cols-6">
        {DIAS.map((dia) => (
          <DiaColumna
            key={dia}
            dia={dia}
            materias={materias}
            onEditar={onEditar}
            onEliminar={onEliminar}
            onDuplicar={onDuplicar}
            onMover={onMover}
            isToday={dia === diaActual}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}

export default GrillaHorario;
