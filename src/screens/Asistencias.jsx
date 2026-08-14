function Asistencias({ isDark = false }) {
  return (
    <div className={`flex min-h-[60vh] items-center justify-center rounded-[28px] border shadow-[0_25px_80px_rgba(2,6,23,0.15)] backdrop-blur ${isDark ? 'border-slate-800/80 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`} />
  );
}

export default Asistencias;
