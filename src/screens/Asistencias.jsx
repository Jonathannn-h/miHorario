import { useState } from 'react';
import Boton from '../components/Boton';
import { formatFecha } from '../utils/formato';

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

function Asistencias({ isDark = false }) {
  const [rango, setRango] = useState(leerRango);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [editando, setEditando] = useState(false);

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

  const mostrarFormulario = !rango || editando;

  return (
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
  );
}

export default Asistencias;
