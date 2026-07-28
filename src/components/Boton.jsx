function Boton({ children, variant = 'primary', ...props }) {
  const base = 'rounded-xl px-3 py-2 text-sm font-medium transition';
  const styles = {
    primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
    secondary: 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800',
    danger: 'bg-rose-500/90 text-white hover:bg-rose-400',
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default Boton;
