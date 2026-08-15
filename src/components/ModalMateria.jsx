import { useEffect, useState } from 'react';
import Boton from './Boton';

const initialState = {
  nombre: '',
  profesor: '',
  aula: '',
  seccion: '',
  dia: 'Lunes',
  horaInicio: '08:00',
  horaFin: '09:00',
  color: '#60a5fa',
};

function ModalMateria({ open, onClose, materia, onSubmit, soloDatosCompartidos = false, isDark = false }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (materia) {
      setForm(materia);
    } else {
      setForm(initialState);
    }
  }, [materia, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm ${isDark ? 'bg-slate-950/75' : 'bg-slate-900/40'}`}>
      <div className={`w-full max-w-xl rounded-3xl border p-6 shadow-[0_25px_80px_rgba(2,6,23,0.25)] ${isDark ? 'border-slate-800/80 bg-slate-900/95' : 'border-slate-200 bg-white/95'}`}>
        <h2 className={`mb-5 text-2xl font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>{materia ? 'Editar materia' : 'Crear materia'}</h2>
        {soloDatosCompartidos && (
          <p className={`mb-4 rounded-2xl border px-3 py-2 text-sm ${isDark ? 'border-sky-500/40 bg-sky-500/10 text-sky-200' : 'border-sky-300 bg-sky-50 text-sky-700'}`}>
            Editás los datos compartidos de todos los días de esta materia. Los días y horarios no se modifican desde acá.
          </p>
        )}
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ring-0 ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500' : 'border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400'}`} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ring-0 ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500' : 'border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400'}`} name="profesor" value={form.profesor} onChange={handleChange} placeholder="Profesor" required />
          <input className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ring-0 ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500' : 'border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400'}`} name="aula" value={form.aula} onChange={handleChange} placeholder="Aula" required />
          <input className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ring-0 ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500' : 'border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400'}`} name="seccion" value={form.seccion} onChange={handleChange} placeholder="Sección" required />
          <select className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 disabled:opacity-50' : 'border-slate-300 bg-slate-50 text-slate-800 disabled:opacity-50'}`} name="dia" value={form.dia} onChange={handleChange} disabled={soloDatosCompartidos}>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
          </select>
          <input className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 disabled:opacity-50' : 'border-slate-300 bg-slate-50 text-slate-800 disabled:opacity-50'}`} type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} required disabled={soloDatosCompartidos} />
          <input className={`rounded-2xl border px-3 py-2.5 text-sm outline-none ${isDark ? 'border-slate-700 bg-slate-950/80 text-slate-100 disabled:opacity-50' : 'border-slate-300 bg-slate-50 text-slate-800 disabled:opacity-50'}`} type="time" name="horaFin" value={form.horaFin} onChange={handleChange} required disabled={soloDatosCompartidos} />
          <div className={`md:col-span-2 flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${isDark ? 'border-slate-700 bg-slate-950/60' : 'border-slate-300 bg-slate-100'}`}>
            <label className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Color</label>
            <input type="color" name="color" value={form.color} onChange={handleChange} className={`h-9 w-12 cursor-pointer rounded border bg-transparent p-1 ${isDark ? 'border-slate-700' : 'border-slate-300'}`} />
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{form.color}</span>
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <Boton type="button" variant="secondary" onClick={onClose}>Cancelar</Boton>
            <Boton type="submit">Guardar</Boton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalMateria;
