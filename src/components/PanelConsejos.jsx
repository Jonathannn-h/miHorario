import { useMemo, useState } from 'react';
import { calcularConsejos } from '../utils/consejos';
import { minutosAHora } from '../utils/formato';

function PanelConsejos({ materias, isDark = false }) {
  const [abierto, setAbierto] = useState(true);
  const consejos = useMemo(() => calcularConsejos(materias), [materias]);

  const renderBloque = (titulo, items, tono) => {
    const tonoClasses = tono === 'alerta'
      ? (isDark ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-rose-300 bg-rose-50 text-rose-700')
      : tono === 'info'
        ? (isDark ? 'border-sky-500/40 bg-sky-500/10 text-sky-200' : 'border-sky-300 bg-sky-50 text-sky-700')
        : (isDark ? 'border-slate-700 bg-slate-800/60 text-slate-200' : 'border-slate-200 bg-white/70 text-slate-700');

    return (
      <div className={`rounded-2xl border p-4 ${tonoClasses}`}>
        <h3 className="text-sm font-semibold">{titulo}</h3>
        {items.length === 0 ? (
          <p className="mt-2 text-sm opacity-80">No se detectaron observaciones.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((item, index) => (
              <li key={`${titulo}-${index}`} className="leading-6">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const choques = consejos.choques.map((choque) => `${choque.dia}: ${choque.materiaA} y ${choque.materiaB} se solapan de ${minutosAHora(choque.inicioSolape)} a ${minutosAHora(choque.finSolape)}.`);

  const diasMasCargados = consejos.diasMasCargados.length === 0
    ? ['Todavía no hay materias cargadas.']
    : consejos.diasMasCargados.map((item) => `${item.dia} (${Math.round(item.totalMinutos / 60)}h)`).join(' · ');

  const huecos = consejos.huecosLibres.map((item) => {
    if (item.tipo === 'vacio') {
      return `${item.dia}: No tienes materias este día.`;
    }

    if (item.tipo === 'sin_huecos') {
      return `${item.dia}: No hay huecos libres.`;
    }

    const resumen = item.huecos
      .map((hueco) => `de ${minutosAHora(hueco.inicio)} a ${minutosAHora(hueco.fin)}`)
      .join(' y ');

    return `${item.dia}: libres ${resumen}.`;
  });

  return (
    <div className={`mb-6 rounded-[24px] border shadow-sm ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
      <button
        onClick={() => setAbierto((prev) => !prev)}
        className={`flex w-full items-center justify-between px-4 py-4 text-left ${isDark ? 'text-slate-100' : 'text-slate-800'}`}
      >
        <div>
          <p className={`text-sm font-semibold ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>Consejos</p>
          <p className="text-sm opacity-80">Resumen útil para ajustar tu semana</p>
        </div>
        <span className={`text-xl transition-transform ${abierto ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {abierto && (
        <div className="grid gap-3 border-t px-4 py-4 md:grid-cols-3">
          {renderBloque('Choques de horario', choques, 'alerta')}
          {renderBloque('Día más cargado', [diasMasCargados], 'info')}
          {renderBloque('Huecos libres', huecos, 'default')}
        </div>
      )}
    </div>
  );
}

export default PanelConsejos;
