import { DIAS } from '../utils/constantes';
import DiaColumna from './DiaColumna';

function obtenerDiaActual() {
  const dias = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
  };
  return dias[new Date().getDay()] || null;
}

function GrillaHorario({ materias, onEditar, onEliminar, onMover, isDark = false }) {
  const diaActual = obtenerDiaActual();

  return (
    <div className={`rounded-[28px] border px-2 py-3 shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-3 py-2 w-full">
        {DIAS.map((dia) => (
          <DiaColumna
            key={dia}
            dia={dia}
            materias={materias}
            onEditar={onEditar}
            onEliminar={onEliminar}
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
