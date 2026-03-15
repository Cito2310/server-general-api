import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Materia } from '../../types';

export const useMaterias = () => {
    const [materias, setMaterias] = useLocalStorage<Materia[]>('materias', []);

    const crear = (nombre: string) => {
        const nueva: Materia = { id: generateId(), nombre };
        setMaterias(prev => [...prev, nueva]);
    };

    const editar = (id: string, nombre: string) => {
        setMaterias(prev => prev.map(m => m.id === id ? { ...m, nombre } : m));
    };

    const eliminar = (id: string) => {
        setMaterias(prev => prev.filter(m => m.id !== id));
    };

    return { materias, crear, editar, eliminar };
};
