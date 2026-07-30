import { DIAS } from '../utils/constantes';
import DiaColumna from './DiaColumna';

function GrillaHorario({ materias, onEditar, onEliminar, onMover }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-slate-900/70 shadow-[0_25px_80px_rgba(2,6,23,0.35)] backdrop-blur">
      <div className="flex overflow-x-auto">
        {DIAS.map((dia) => (
          <DiaColumna
            key={dia}
            dia={dia}
            materias={materias}
            onEditar={onEditar}
            onEliminar={onEliminar}
            onMover={onMover}
          />
        ))}
      </div>
    </div>
  );
}

export default GrillaHorario;
