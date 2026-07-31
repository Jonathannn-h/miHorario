function UndoSnackbar({ open, message, onUndo, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-slate-900/95 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur">
      <p className="text-sm text-slate-100">{message}</p>
      <button
        className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-sky-400"
        onClick={onUndo}
      >
        Deshacer
      </button>
      <button
        className="text-xs text-slate-400 underline hover:text-slate-200"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  );
}

export default UndoSnackbar;
