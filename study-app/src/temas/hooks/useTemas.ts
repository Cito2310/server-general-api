import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Tema } from '../../types';

export const useTemas = () => {
    const [temas, setTemas] = useLocalStorage<Tema[]>('temas', []);

    const crear = (unidadId: string, nombre: string) => {
        const nuevo: Tema = { id: generateId(), unidadId, nombre };
        setTemas(prev => [...prev, nuevo]);
    };

    const editar = (id: string, nombre: string) => {
        setTemas(prev => prev.map(t => t.id === id ? { ...t, nombre } : t));
    };

    const eliminar = (id: string) => {
        setTemas(prev => prev.filter(t => t.id !== id));
    };

    const porUnidad = (unidadId: string) => temas.filter(t => t.unidadId === unidadId);

    return { temas, crear, editar, eliminar, porUnidad };
};
