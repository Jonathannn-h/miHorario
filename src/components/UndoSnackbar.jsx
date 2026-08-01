function UndoSnackbar({ open, message, onUndo, onClose, isDark = false }) {
  if (!open) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur ${isDark ? 'bg-slate-900/95' : 'bg-white/95'}`}>
      <p className={`text-sm ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{message}</p>
      <button
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${isDark ? 'bg-sky-500 text-slate-950 hover:bg-sky-400' : 'bg-sky-600 text-white hover:bg-sky-500'}`}
        onClick={onUndo}
      >
        Deshacer
      </button>
      <button
        className={`text-xs underline ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  );
}

export default UndoSnackbar;
