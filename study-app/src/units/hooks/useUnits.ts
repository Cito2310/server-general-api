import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Unit } from '../../types';

export const useUnits = () => {
    const [units, setUnits] = useLocalStorage<Unit[]>('units', []);

    const create = (subjectId: string, name: string) => {
        const newItem: Unit = { id: generateId(), subjectId, name };
        setUnits(prev => [...prev, newItem]);
    };

    const edit = (id: string, name: string) => {
        setUnits(prev => prev.map(u => u.id === id ? { ...u, name } : u));
    };

    const remove = (id: string) => {
        setUnits(prev => prev.filter(u => u.id !== id));
    };

    const bySubject = (subjectId: string) => units.filter(u => u.subjectId === subjectId);

    return { units, create, edit, remove, bySubject };
};
