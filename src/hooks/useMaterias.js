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

  const editarMateriasPorNombre = (nombre, data) => {
    const clave = String(nombre || '').trim().toLowerCase();
    setMaterias((prev) =>
      prev.map((materia) =>
        String(materia.nombre || '').trim().toLowerCase() === clave ? { ...materia, ...data } : materia
      )
    );
  };

  const duplicarMateria = (id) => {
    setMaterias((prev) => {
      const materia = prev.find((item) => item.id === id);
      if (!materia) return prev;

      const copia = {
        ...materia,
        id: crypto.randomUUID(),
        nombre: `${materia.nombre} (copia)`,
      };

      return [...prev, copia];
    });
  };

  const eliminarMateria = (idOrMateria) => {
    const id = typeof idOrMateria === 'object' ? idOrMateria?.id : idOrMateria;
    if (!id) return;
    setMaterias((prev) => prev.filter((materia) => materia.id !== id));
  };

  const restaurarMateria = (materia) => {
    if (!materia?.id) return;
    setMaterias((prev) => [...prev, materia]);
  };

  const moverMateria = (id, dia) => {
    setMaterias((prev) => prev.map((materia) => (materia.id === id ? { ...materia, dia } : materia)));
  };

  return { materias, agregarMateria, editarMateria, editarMateriasPorNombre, duplicarMateria, eliminarMateria, restaurarMateria, moverMateria };
}
