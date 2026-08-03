import { useState } from 'react';
import { formatHora } from '../utils/formato';
import ConfirmDialog from './ConfirmDialog';

function obtenerColorTextoContraste(hexColor = '#60a5fa') {
  const limpio = (hexColor || '#60a5fa').replace('#', '');
  const completo = limpio.length === 3 ? limpio.split('').map((c) => c + c).join('') : limpio;
  const valor = parseInt(completo, 16);
  const r = (valor >> 16) & 255;
  const g = (valor >> 8) & 255;
  const b = valor & 255;
  const luminancia = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
  return luminancia > 0.6 ? '#0f172a' : '#f8fafc';
}

function MateriaCard({ materia, onEditar, onEliminar, onDuplicar, isDark = false }) {
  const [dragging, setDragging] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [dropPulse, setDropPulse] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const colorBase = materia.color || '#60a5fa';
  const colorTexto = obtenerColorTextoContraste(colorBase);
  const esFondoClaro = colorTexto === '#0f172a';
  const cardStyle = {
    background: `linear-gradient(135deg, ${colorBase} 0%, ${colorBase}cc 100%)`,
    color: colorTexto,
  };
  const botonStyle = {
    backgroundColor: esFondoClaro ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.16)',
    color: colorTexto,
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', materia.id);
    e.dataTransfer.effectAllowed = 'move';
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
    setDropPulse(true);
    window.setTimeout(() => setDropPulse(false), 220);
  };

  return (
    <div className="relative group">
      <div className={`pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-md px-2 py-1 text-xs shadow-md transition-opacity duration-150 group-hover:block ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-700 text-slate-100'}`}>
        Arrastra para mover a otro día
      </div>

      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title="Arrastra para mover a otro día"
        className={`w-full rounded-3xl border border-white/10 p-4 text-sm shadow-[0_8px_24px_rgba(15,23,42,0.25)] ${dragging ? 'opacity-60' : 'opacity-100'} cursor-grab transition-all duration-300 ${dropPulse ? 'scale-[1.03] -translate-y-2 shadow-[0_16px_36px_rgba(15,23,42,0.35)]' : ''} ${removing ? 'animate-fade-out scale-95 opacity-0' : ''}`}
        style={cardStyle}
      >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold" style={{ color: colorTexto }}>{materia.nombre}</p>
          <p className="mt-1 text-xs" style={{ color: colorTexto }}>{materia.profesor}</p>
        </div>
        <div className="relative">
          <button
            style={botonStyle}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            aria-label="Abrir acciones"
          >
            ⋯
          </button>

          {menuOpen && (
            <div className={`absolute right-0 z-10 mt-2 min-w-[140px] rounded-2xl border p-2 shadow-lg ${isDark ? 'border-slate-700 bg-slate-900/95 text-slate-100' : 'border-slate-200 bg-white/95 text-slate-800'}`}>
              <button
                className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onDuplicar?.(materia.id);
                }}
              >
                Duplicar
              </button>
              <button
                className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onEditar(materia);
                }}
              >
                Editar
              </button>
              <button
                className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setConfirmOpen(true);
                }}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-1 text-[11px]" style={{ color: colorTexto }}>
        <p>{materia.aula} · {materia.seccion}</p>
        <p>{formatHora(materia.horaInicio)} - {formatHora(materia.horaFin)}</p>
      </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar eliminación"
        message={`¿Seguro que quieres eliminar ${materia.nombre}?`}
        onConfirm={() => {
          setRemoving(true);
          setConfirmOpen(false);
          setTimeout(() => onEliminar(materia), 260);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default MateriaCard;
