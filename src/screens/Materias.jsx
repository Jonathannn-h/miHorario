import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { DIAS } from '../utils/constantes';
import { horaEnMinutos } from '../utils/formato';
import ModalHorarioMateria from '../components/ModalHorarioMateria';

const COMPARADORES = {
  nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }),
  profesor: (a, b) => a.profesor.localeCompare(b.profesor, 'es', { sensitivity: 'base' }),
  aula: (a, b) => a.aula.localeCompare(b.aula, 'es', { sensitivity: 'base' }),
  seccion: (a, b) => a.seccion.localeCompare(b.seccion, 'es', { sensitivity: 'base' }),
  dias: (a, b) => a.dias.length - b.dias.length || DIAS.indexOf(a.dias[0] || '') - DIAS.indexOf(b.dias[0] || ''),
  horario: (a, b) => a.inicioMin - b.inicioMin,
  color: (a, b) => parseInt(a.color.replace('#', ''), 16) - parseInt(b.color.replace('#', ''), 16),
};

function Materias({ materias, onEditarGrupo, onVerGrilla, isDark = false }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [orden, setOrden] = useState({ columna: null, direccion: 'asc' });

  const agrupadas = useMemo(() => {
    const grupos = new Map();

    materias.forEach((materia) => {
      const clave = materia.nombre.trim().toLowerCase();
      if (!grupos.has(clave)) {
        grupos.set(clave, {
          nombre: materia.nombre,
          profesor: materia.profesor,
          aula: materia.aula,
          seccion: materia.seccion,
          color: materia.color,
          clases: [],
        });
      }
      grupos.get(clave).clases.push(materia);
    });

    return Array.from(grupos.values()).map((grupo) => {
      const porHorario = new Map();
      grupo.clases.forEach((materia) => {
        const tiempo = `${materia.horaInicio} - ${materia.horaFin}`;
        if (!porHorario.has(tiempo)) porHorario.set(tiempo, []);
        porHorario.get(tiempo).push(materia.dia);
      });

      const horario = Array.from(porHorario.entries()).map(([tiempo, dias]) => {
        const ordenados = DIAS.filter((dia) => dias.includes(dia));
        const diasTxt = ordenados.join(', ');
        return `${tiempo}${ordenados.length > 1 ? ` (${diasTxt})` : ''}`;
      });

      const dias = DIAS.filter((dia) => grupo.clases.some((materia) => materia.dia === dia));
      const inicioMin = Math.min(...grupo.clases.map((materia) => horaEnMinutos(materia.horaInicio)));

      return { ...grupo, dias, horario, inicioMin };
    });
  }, [materias]);

  const visibles = useMemo(() => {
    const lista = [...agrupadas];
    if (!orden.columna) return lista;
    const comparador = COMPARADORES[orden.columna];
    if (!comparador) return lista;
    lista.sort((a, b) => {
      const resultado = comparador(a, b);
      return orden.direccion === 'asc' ? resultado : -resultado;
    });
    return lista;
  }, [agrupadas, orden]);

  const toggleOrden = (columna) => {
    setOrden((prev) => {
      if (prev.columna === columna) {
        return { columna, direccion: prev.direccion === 'asc' ? 'desc' : 'asc' };
      }
      return { columna, direccion: 'asc' };
    });
  };

  const cardCls = `rounded-[28px] border shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`;
  const thCls = `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`;
  const tdCls = `px-4 py-3 text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`;
  const badgeCls = `inline-block rounded-xl border px-2 py-0.5 text-xs font-medium ${isDark ? 'border-slate-700 bg-slate-800/80 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-600'}`;
  const editarBtnCls = `rounded-xl border px-3 py-1.5 text-xs font-medium transition ${isDark ? 'border-slate-600 bg-slate-800/80 text-slate-200 hover:bg-slate-700/90' : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'}`;

  const renderTh = (columna, label) => {
    const activa = orden.columna === columna;
    return (
      <th key={columna} className={`${thCls} p-0`}>
        <button
          type="button"
          onClick={() => toggleOrden(columna)}
          className={`flex w-full items-center gap-1.5 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider transition ${activa ? (isDark ? 'text-sky-300' : 'text-sky-700') : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
        >
          {label}
          {activa ? (
            orden.direccion === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
          ) : (
            <ArrowUpDown className={`h-3.5 w-3.5 opacity-40`} />
          )}
        </button>
      </th>
    );
  };

  return (
    <div className="grid gap-6">
      <div className={`${cardCls} p-6`}>
        <div className="flex items-center justify-between gap-3">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>Materias</h2>
          <span className={`rounded-2xl border px-3 py-1 text-sm font-medium ${isDark ? 'border-slate-700/70 bg-slate-800/80 text-slate-100' : 'border-slate-200 bg-slate-100 text-slate-800'}`}>
            {agrupadas.length} {agrupadas.length === 1 ? 'materia' : 'materias'}
          </span>
        </div>
      </div>

      <div className={`${cardCls} overflow-hidden`}>
        {agrupadas.length === 0 ? (
          <p className={`p-8 text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Todavía no hay materias cargadas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead className={`${isDark ? 'border-b border-slate-800 bg-slate-950/50' : 'border-b border-slate-200 bg-slate-50'}`}>
                <tr>
                  {renderTh('nombre', 'Materia')}
                  {renderTh('profesor', 'Profesor')}
                  {renderTh('aula', 'Aula')}
                  {renderTh('seccion', 'Sección')}
                  {renderTh('dias', 'Días')}
                  {renderTh('horario', 'Horario')}
                  {renderTh('color', 'Color')}
                  <th className={thCls}>Acciones</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-200/80'}`}>
                {visibles.map((materia) => (
                  <tr
                    key={materia.nombre}
                    onClick={() => setSeleccionada(materia)}
                    className={`cursor-pointer transition ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}
                  >
                    <td className={tdCls}>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: materia.color }} />
                        <span className="font-medium">{materia.nombre}</span>
                      </div>
                    </td>
                    <td className={tdCls}>{materia.profesor}</td>
                    <td className={tdCls}>{materia.aula}</td>
                    <td className={tdCls}>{materia.seccion}</td>
                    <td className={tdCls}>
                      <div className="flex flex-wrap gap-1.5">
                        {materia.dias.map((dia) => (
                          <span key={dia} className={badgeCls}>{dia}</span>
                        ))}
                      </div>
                    </td>
                    <td className={tdCls}>
                      <div className="space-y-1">
                        {materia.horario.map((hora) => (
                          <div key={hora}>{hora}</div>
                        ))}
                      </div>
                    </td>
                    <td className={tdCls}>
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-md border" style={{ backgroundColor: materia.color }} />
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{materia.color}</span>
                      </span>
                    </td>
                    <td className={tdCls}>
                      <button
                        type="button"
                        className={editarBtnCls}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditarGrupo?.(materia.clases[0]);
                        }}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalHorarioMateria
        materia={seleccionada}
        onClose={() => setSeleccionada(null)}
        onVerGrilla={() => {
          setSeleccionada(null);
          onVerGrilla?.();
        }}
        isDark={isDark}
      />
    </div>
  );
}

export default Materias;
