import { useMemo, useState } from 'react';
import Boton from '../components/Boton';
import FilaClase from '../components/FilaClase';
import { formatFecha } from '../utils/formato';
import { generarClases } from '../utils/clases';
import { useEstadosClases } from '../hooks/useEstadosClases';
import { ESTADO_ASISTIO, ESTADO_FALTO, ESTADO_NO_HUBO } from '../utils/estadosClase';

const STORAGE_KEY = 'miHorario:rangoClases';

function leerRango() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function Asistencias({ materias, isDark = false }) {
  const [rango, setRango] = useState(leerRango);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [editando, setEditando] = useState(false);
  const { estados, setEstado } = useEstadosClases();

  const clases = rango ? generarClases(materias, rango.fechaInicio, rango.fechaFin) : [];

  const resumen = useMemo(() => {
    const porMateria = materias
      .map((materia) => {
        const deMateria = clases.filter((clase) => clase.materiaId === materia.id);
        const asistio = deMateria.filter((clase) => estados[clase.id] === ESTADO_ASISTIO).length;
        const falto = deMateria.filter((clase) => estados[clase.id] === ESTADO_FALTO).length;
        const noHubo = deMateria.filter((clase) => estados[clase.id] === ESTADO_NO_HUBO).length;
        const total = deMateria.length;
        const consideradas = asistio + falto;
        const porcentaje = consideradas > 0 ? Math.round((asistio / consideradas) * 100) : null;
        return { materia, total, asistio, falto, noHubo, porcentaje };
      })
      .filter((item) => item.total > 0);

    const totales = porMateria.reduce(
      (acc, item) => ({
        total: acc.total + item.total,
        asistio: acc.asistio + item.asistio,
        falto: acc.falto + item.falto,
        noHubo: acc.noHubo + item.noHubo,
      }),
      { total: 0, asistio: 0, falto: 0, noHubo: 0 }
    );

    const consideradas = totales.asistio + totales.falto;
    const porcentajeGlobal = consideradas > 0 ? Math.round((totales.asistio / consideradas) * 100) : null;

    return { porMateria, totales, porcentajeGlobal };
  }, [clases, estados, materias]);

  const guardar = (e) => {
    e.preventDefault();
    const nuevo = { fechaInicio, fechaFin };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevo));
    setRango(nuevo);
    setEditando(false);
  };

  const iniciarEdicion = () => {
    setFechaInicio(rango.fechaInicio);
    setFechaFin(rango.fechaFin);
    setEditando(true);
  };

  const inputCls = `w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ring-0 ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100' : 'border-slate-300 bg-slate-50 text-slate-800'}`;
  const labelCls = `mb-1.5 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`;
  const cardCls = `rounded-[28px] border p-6 shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`;

  const pillCls = (tono, activo) => {
    const base = 'rounded-2xl border px-3 py-1.5 text-sm font-medium';
    if (activo) return `${base} ${tono.activa}`;
    return `${base} ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-500'}`;
  };

  const tonos = {
    asistio: {
      activa: isDark ? 'border-emerald-400/70 bg-emerald-500/20 text-emerald-300' : 'border-emerald-500 bg-emerald-500/15 text-emerald-700',
    },
    falto: {
      activa: isDark ? 'border-rose-400/70 bg-rose-500/20 text-rose-300' : 'border-rose-500 bg-rose-500/15 text-rose-700',
    },
    no_hubo: {
      activa: isDark ? 'border-slate-400/70 bg-slate-500/20 text-slate-200' : 'border-slate-500 bg-slate-500/15 text-slate-700',
    },
  };

  const mostrarFormulario = !rango || editando;

  return (
    <div className="grid gap-6">
      <div className={cardCls}>
        {mostrarFormulario ? (
          <form className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end" onSubmit={guardar}>
            <div>
              <label className={labelCls} htmlFor="fechaInicio">Fecha de inicio de clases</label>
              <input id="fechaInicio" type="date" className={inputCls} value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
            </div>
            <div>
              <label className={labelCls} htmlFor="fechaFin">Fecha de fin de clases</label>
              <input id="fechaFin" type="date" className={inputCls} value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
            </div>
            <div>
              <Boton type="submit">Guardar</Boton>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-2xl border px-4 py-2.5 text-sm font-medium ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-100' : 'border-slate-200 bg-slate-100 text-slate-800'}`}>
                {formatFecha(rango.fechaInicio)}
              </span>
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>→</span>
              <span className={`rounded-2xl border px-4 py-2.5 text-sm font-medium ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-100' : 'border-slate-200 bg-slate-100 text-slate-800'}`}>
                {formatFecha(rango.fechaFin)}
              </span>
            </div>
            <Boton type="button" variant="secondary" onClick={iniciarEdicion}>Cambiar fechas</Boton>
          </div>
        )}
      </div>

      {clases.length > 0 && (
        <>
          <div className={cardCls}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>Resumen de asistencia</h2>
              <div className="flex flex-wrap gap-2">
                <span className={pillCls('asistio', resumen.totales.asistio > 0)}>Asistió {resumen.totales.asistio}</span>
                <span className={pillCls('falto', resumen.totales.falto > 0)}>Faltó {resumen.totales.falto}</span>
                <span className={pillCls('no_hubo', resumen.totales.noHubo > 0)}>No hubo {resumen.totales.noHubo}</span>
              </div>
            </div>
            <p className={`mt-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {resumen.porcentajeGlobal != null
                ? `Porcentaje de asistencia: ${resumen.porcentajeGlobal}% (${resumen.totales.asistio} de ${resumen.totales.asistio + resumen.totales.falto} clases consideradas).`
                : 'Marca el estado de cada clase para ver tu porcentaje de asistencia.'}
            </p>
            <p className={`mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Las clases marcadas como "No hubo clase" se excluyen del cálculo del porcentaje.
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {resumen.porMateria.map((item) => (
                <div key={item.materia.id} className={`rounded-2xl border px-4 py-3 ${isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/70'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{item.materia.nombre}</p>
                    {item.porcentaje != null ? (
                      <span className={`rounded-xl px-2 py-0.5 text-xs font-semibold ${isDark ? 'bg-slate-700/60 text-slate-200' : 'bg-slate-200 text-slate-700'}`}>
                        {item.porcentaje}%
                      </span>
                    ) : (
                      <span className={`rounded-xl px-2 py-0.5 text-xs font-semibold ${isDark ? 'bg-slate-800/60 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                        —
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.total} clases · Asistió {item.asistio} · Faltó {item.falto} · No hubo {item.noHubo}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={cardCls}>
            <h2 className={`mb-4 text-lg font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>Clases</h2>
            <div className="space-y-6">
              {resumen.porMateria.map(({ materia }) => {
                const deMateria = clases.filter((clase) => clase.materiaId === materia.id);
                return (
                  <div key={materia.id}>
                    <p className={`mb-2 text-sm font-semibold ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>{materia.nombre}</p>
                    <ul className="space-y-2">
                      {deMateria.map((clase) => (
                        <FilaClase key={clase.id} clase={clase} estado={estados[clase.id]} onEstado={setEstado} isDark={isDark} />
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Asistencias;
