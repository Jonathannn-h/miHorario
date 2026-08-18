import { useEffect, useState } from 'react';

const STORAGE_KEY_ESTADOS = 'miHorario:estadosClases';
const STORAGE_KEY_NOTAS = 'miHorario:notasClases';

function leerStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function useEstadosClases() {
  const [estados, setEstados] = useState(() => leerStorage(STORAGE_KEY_ESTADOS, {}));
  const [notas, setNotas] = useState(() => leerStorage(STORAGE_KEY_NOTAS, {}));

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_ESTADOS, JSON.stringify(estados));
  }, [estados]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_NOTAS, JSON.stringify(notas));
  }, [notas]);

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
    if (estado !== 'no_hubo') {
      setNotas((prev) => {
        if (!(claseId in prev)) return prev;
        const next = { ...prev };
        delete next[claseId];
        return next;
      });
    }
  };

  const setNota = (claseId, nota) => {
    setNotas((prev) => {
      if (!nota) {
        const next = { ...prev };
        delete next[claseId];
        return next;
      }
      return { ...prev, [claseId]: nota };
    });
  };

  return { estados, setEstado, notas, setNota };
}
