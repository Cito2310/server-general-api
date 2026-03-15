import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { generateId } from '../../shared/utils/id';
import type { Node } from '../../types';

export const useNodes = () => {
    const [nodes, setNodes] = useLocalStorage<Node[]>('nodes', []);

    const create = (topicId: string, parentId: string | null, label: string, content: string, contentMode: 'inline' | 'block' = 'block') => {
        const siblings = nodes.filter(n => n.topicId === topicId && n.parentId === parentId);
        const order = siblings.length;
        const newItem: Node = { id: generateId(), topicId, parentId, label, content, contentMode, order };
        setNodes(prev => [...prev, newItem]);
    };

    const edit = (id: string, label: string, content: string, contentMode: 'inline' | 'block' = 'block') => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, label, content, contentMode } : n));
    };

    const remove = (id: string) => {
        const idsToDelete = new Set<string>();

        const collect = (nodeId: string) => {
            idsToDelete.add(nodeId);
            nodes.filter(n => n.parentId === nodeId).forEach(child => collect(child.id));
        };

        collect(id);
        setNodes(prev => prev.filter(n => !idsToDelete.has(n.id)));
    };

    const byTopic = (topicId: string) => nodes.filter(n => n.topicId === topicId);

    const children = (topicId: string, parentId: string | null) =>
        nodes
            .filter(n => n.topicId === topicId && n.parentId === parentId)
            .sort((a, b) => a.order - b.order);

    return { nodes, create, edit, remove, byTopic, children };
};
