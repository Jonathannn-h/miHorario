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
};

function ModalMateria({ open, onClose, materia, onSubmit }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800/80 bg-slate-900/95 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)]">
        <h2 className="mb-5 text-2xl font-semibold text-slate-50">{materia ? 'Editar materia' : 'Crear materia'}</h2>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500" name="profesor" value={form.profesor} onChange={handleChange} placeholder="Profesor" required />
          <input className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500" name="aula" value={form.aula} onChange={handleChange} placeholder="Aula" required />
          <input className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500" name="seccion" value={form.seccion} onChange={handleChange} placeholder="Sección" required />
          <select className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none" name="dia" value={form.dia} onChange={handleChange}>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>
          <input className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none" type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} required />
          <input className="rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none" type="time" name="horaFin" value={form.horaFin} onChange={handleChange} required />
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
