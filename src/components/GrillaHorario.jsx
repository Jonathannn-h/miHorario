import { DIAS } from '../utils/constantes';
import ColumnaHoras from './ColumnaHoras';
import DiaColumna from './DiaColumna';

function GrillaHorario({ materias, onEditar, onEliminar, onMover }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/30">
      <div className="flex">
        <ColumnaHoras />
        <div className="flex flex-1 overflow-x-auto">
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
    </div>
  );
}

export default GrillaHorario;
