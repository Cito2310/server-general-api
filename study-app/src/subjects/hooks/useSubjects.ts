import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Subject } from '../../types';

export const useSubjects = () => {
    const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', []);

    const create = (name: string) => {
        const newItem: Subject = { id: generateId(), name };
        setSubjects(prev => [...prev, newItem]);
    };

    const edit = (id: string, name: string) => {
        setSubjects(prev => prev.map(s => s.id === id ? { ...s, name } : s));
    };

    const remove = (id: string) => {
        setSubjects(prev => prev.filter(s => s.id !== id));
    };

    return { subjects, create, edit, remove };
};
