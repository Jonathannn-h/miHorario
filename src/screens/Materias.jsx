function Materias({ isDark = false }) {
  return (
    <div className={`rounded-[28px] border p-10 text-center shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
      <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>Materias</h2>
      <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pantalla en construcción.</p>
    </div>
  );
}

export default Materias;
