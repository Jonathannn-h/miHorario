function Boton({ children, variant = 'primary', ...props }) {
  const base = 'rounded-xl px-3 py-2 text-sm font-medium transition shadow-sm';
  const styles = {
    primary: 'bg-sky-500/90 text-slate-950 hover:bg-sky-400',
    secondary: 'border border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800',
    danger: 'bg-rose-500/90 text-white hover:bg-rose-400',
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default Boton;
