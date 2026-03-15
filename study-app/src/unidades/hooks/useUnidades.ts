import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Unidad } from '../../types';

export const useUnidades = () => {
    const [unidades, setUnidades] = useLocalStorage<Unidad[]>('unidades', []);

    const crear = (materiaId: string, nombre: string) => {
        const nueva: Unidad = { id: generateId(), materiaId, nombre };
        setUnidades(prev => [...prev, nueva]);
    };

    const editar = (id: string, nombre: string) => {
        setUnidades(prev => prev.map(u => u.id === id ? { ...u, nombre } : u));
    };

    const eliminar = (id: string) => {
        setUnidades(prev => prev.filter(u => u.id !== id));
    };

    const porMateria = (materiaId: string) => unidades.filter(u => u.materiaId === materiaId);

    return { unidades, crear, editar, eliminar, porMateria };
};
