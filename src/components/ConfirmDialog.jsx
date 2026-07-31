import Boton from './Boton';

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800/90 bg-slate-900/95 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.45)]">
        <h2 className="text-xl font-semibold text-slate-50">{title}</h2>
        <p className="mt-3 text-sm text-slate-300">{message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Boton type="button" variant="secondary" onClick={onCancel}>Cancelar</Boton>
          <Boton type="button" variant="danger" onClick={onConfirm}>Eliminar</Boton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
