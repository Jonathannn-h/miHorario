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

function GrillaHorario({ materias, onEditar, onEliminar, onMover }) {
  const diaActual = obtenerDiaActual();

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/70 shadow-[0_25px_80px_rgba(2,6,23,0.35)] backdrop-blur">
      <div className="flex flex-col md:flex-row overflow-x-auto md:overflow-visible gap-4 px-3 py-4">
        {DIAS.map((dia) => (
          <DiaColumna
            key={dia}
            dia={dia}
            materias={materias}
            onEditar={onEditar}
            onEliminar={onEliminar}
            onMover={onMover}
            isToday={dia === diaActual}
          />
        ))}
      </div>
    </div>
  );
}

export default GrillaHorario;
