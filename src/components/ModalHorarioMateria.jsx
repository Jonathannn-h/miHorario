import { X } from 'lucide-react';
import { DIAS } from '../utils/constantes';
import { formatHora } from '../utils/formato';
import Boton from './Boton';

function colorTextoContraste(hexColor = '#60a5fa') {
  const limpio = (hexColor || '#60a5fa').replace('#', '');
  const completo = limpio.length === 3 ? limpio.split('').map((c) => c + c).join('') : limpio;
  const valor = parseInt(completo, 16);
  const r = (valor >> 16) & 255;
  const g = (valor >> 8) & 255;
  const b = valor & 255;
  const luminancia = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
  return luminancia > 0.6 ? '#0f172a' : '#f8fafc';
}

function ModalHorarioMateria({ materia, onClose, onVerGrilla, isDark = false }) {
  if (!materia) return null;

  const colorBase = materia.color || '#60a5fa';
  const colorTexto = colorTextoContraste(colorBase);
  const records = materia.clases || [];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm ${isDark ? 'bg-slate-950/75' : 'bg-slate-900/40'}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl border p-6 shadow-[0_25px_80px_rgba(2,6,23,0.25)] ${isDark ? 'border-slate-800/80 bg-slate-900/95' : 'border-slate-200 bg-white/95'}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 shrink-0 rounded-2xl border" style={{ backgroundColor: colorBase }} />
            <div>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>{materia.nombre}</h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {[materia.profesor, materia.aula, materia.seccion].filter(Boolean).join(' · ')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-300 hover:bg-slate-700/90' : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-2">
          {DIAS.map((dia) => {
            const delDia = records
              .filter((r) => r.dia === dia)
              .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

            return (
              <div key={dia} className="flex min-h-[110px] flex-col">
                <p className={`mb-2 text-center text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {dia.slice(0, 3)}
                </p>
                <div className="flex flex-1 flex-col gap-1.5">
                  {delDia.length === 0 ? (
                    <div className={`flex-1 rounded-xl border border-dashed ${isDark ? 'border-slate-700/80 bg-slate-950/50' : 'border-slate-300 bg-slate-50/60'}`} />
                  ) : (
                    delDia.map((record) => (
                      <div
                        key={record.id}
                        className="rounded-xl px-1 py-2 text-center"
                        style={{ background: `linear-gradient(135deg, ${colorBase} 0%, ${colorBase}cc 100%)`, color: colorTexto }}
                      >
                        <p className="text-[10px] font-semibold leading-4">{formatHora(record.horaInicio)}</p>
                        <p className="text-[10px] leading-4">{formatHora(record.horaFin)}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Boton type="button" variant="secondary" onClick={onClose}>Cerrar</Boton>
          <Boton type="button" onClick={onVerGrilla}>Ver en la grilla</Boton>
        </div>
      </div>
    </div>
  );
}

export default ModalHorarioMateria;
