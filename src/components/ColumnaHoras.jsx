import { HORA_FIN, HORA_INICIO } from '../utils/constantes';

function ColumnaHoras() {
  const horas = [];
  for (let hora = HORA_INICIO; hora <= HORA_FIN; hora++) {
    horas.push(hora);
  }

  return (
    <div className="w-24 shrink-0 border-r border-slate-800/80 bg-slate-900/90">
      <div className="flex h-14 items-center justify-center border-b border-slate-800/90 text-sm font-medium text-slate-400">
        Hora
      </div>
      {horas.map((hora) => (
        <div key={hora} className="flex h-20 items-center justify-center border-b border-slate-800/90 text-sm text-slate-500">
          {String(hora).padStart(2, '0')}:00
        </div>
      ))}
    </div>
  );
}

export default ColumnaHoras;
