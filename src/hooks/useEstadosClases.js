import { useEffect, useState } from 'react';

const STORAGE_KEY = 'miHorario:estadosClases';

function leerStorage() {
  if (typeof window === 'undefined') return {};
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function useEstadosClases() {
  const [estados, setEstados] = useState(leerStorage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estados));
  }, [estados]);

  const setEstado = (claseId, estado) => {
    setEstados((prev) => {
      const next = { ...prev };
      if (estado == null) {
        delete next[claseId];
      } else {
        next[claseId] = estado;
      }
      return next;
    });
  };

  return { estados, setEstado };
}
