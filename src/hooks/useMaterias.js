import { useEffect, useState } from 'react';

const STORAGE_KEY = 'miHorario:materias';

function leerStorage() {
  if (typeof window === 'undefined') return [];
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function useMaterias() {
  const [materias, setMaterias] = useState(() => leerStorage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(materias));
  }, [materias]);

  const agregarMateria = (data) => {
    const nuevaMateria = {
      id: crypto.randomUUID(),
      ...data,
    };
    setMaterias((prev) => [...prev, nuevaMateria]);
  };

  const editarMateria = (id, data) => {
    setMaterias((prev) => prev.map((materia) => (materia.id === id ? { ...materia, ...data } : materia)));
  };

  const eliminarMateria = (id) => {
    setMaterias((prev) => prev.filter((materia) => materia.id !== id));
  };

  const restaurarMateria = (materia) => {
    setMaterias((prev) => [...prev, materia]);
  };

  const moverMateria = (id, dia) => {
    setMaterias((prev) => prev.map((materia) => (materia.id === id ? { ...materia, dia } : materia)));
  };

  return { materias, agregarMateria, editarMateria, eliminarMateria, restaurarMateria, moverMateria };
}
