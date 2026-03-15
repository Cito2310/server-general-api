import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Topic } from '../../types';

export const useTopics = () => {
    const [topics, setTopics] = useLocalStorage<Topic[]>('topics', []);

    const create = (unitId: string, name: string) => {
        const newItem: Topic = { id: generateId(), unitId, name };
        setTopics(prev => [...prev, newItem]);
    };

    const edit = (id: string, name: string) => {
        setTopics(prev => prev.map(t => t.id === id ? { ...t, name } : t));
    };

    const remove = (id: string) => {
        setTopics(prev => prev.filter(t => t.id !== id));
    };

    const byUnit = (unitId: string) => topics.filter(t => t.unitId === unitId);

    return { topics, create, edit, remove, byUnit };
};
