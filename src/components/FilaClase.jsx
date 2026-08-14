import { ESTADOS_CLASE } from '../utils/estadosClase';
import { formatFecha } from '../utils/formato';

function opcionesEstado(isDark) {
  return {
    asistio: {
      activa: isDark ? 'border-emerald-400/70 bg-emerald-500/20 text-emerald-300' : 'border-emerald-500 bg-emerald-500/15 text-emerald-700',
      inactiva: isDark
        ? 'border-slate-700/70 bg-slate-800/60 text-slate-400 hover:border-emerald-400/50 hover:text-emerald-300'
        : 'border-slate-300 bg-slate-100/60 text-slate-500 hover:border-emerald-500/50 hover:text-emerald-700',
    },
    falto: {
      activa: isDark ? 'border-rose-400/70 bg-rose-500/20 text-rose-300' : 'border-rose-500 bg-rose-500/15 text-rose-700',
      inactiva: isDark
        ? 'border-slate-700/70 bg-slate-800/60 text-slate-400 hover:border-rose-400/50 hover:text-rose-300'
        : 'border-slate-300 bg-slate-100/60 text-slate-500 hover:border-rose-500/50 hover:text-rose-700',
    },
    no_hubo: {
      activa: isDark ? 'border-slate-400/70 bg-slate-500/20 text-slate-100' : 'border-slate-500 bg-slate-500/15 text-slate-700',
      inactiva: isDark
        ? 'border-slate-700/70 bg-slate-800/60 text-slate-400 hover:border-slate-400/50 hover:text-slate-200'
        : 'border-slate-300 bg-slate-100/60 text-slate-500 hover:border-slate-500/50 hover:text-slate-700',
    },
  };
}

function FilaClase({ clase, estado, onEstado, isDark = false }) {
  const opciones = opcionesEstado(isDark);

  return (
    <li className={`flex flex-col gap-3 rounded-2xl border p-3 md:flex-row md:items-center md:justify-between ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/60'}`}>
      <div className="min-w-0">
        <p className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
          {formatFecha(clase.fecha)}
          <span className={`ml-2 text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {clase.horaInicio} - {clase.horaFin}
          </span>
        </p>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {[clase.aula, clase.seccion].filter(Boolean).join(' · ')}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {ESTADOS_CLASE.map((opcion) => {
          const activo = estado === opcion.id;
          const estilos = opciones[opcion.id];
          return (
            <button
              key={opcion.id}
              type="button"
              onClick={() => onEstado(clase.id, activo ? null : opcion.id)}
              className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition ${activo ? estilos.activa : estilos.inactiva}`}
            >
              {opcion.label}
            </button>
          );
        })}
      </div>
    </li>
  );
}

export default FilaClase;
