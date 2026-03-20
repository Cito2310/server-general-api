import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/id';
import type { Topic, Node } from '../../types';

interface ImportedNode {
    id: string;
    parentId: string | null;
    label: string;
    content: string;
    contentMode: 'inline' | 'block';
    order: number;
}

interface ImportedTopic {
    name: string;
    nodes: ImportedNode[];
}

interface ImportedData {
    unit: { id: string; name: string };
    topics: ImportedTopic[];
}

const resolveTopicName = (name: string, existingNames: string[]): string => {
    if (!existingNames.includes(name)) return name;

    let counter = 2;
    while (existingNames.includes(`${name} (${counter})`)) counter++;
    return `${name} (${counter})`;
};

export const useImportJson = () => {
    const [topics, setTopics] = useLocalStorage<Topic[]>('topics', []);
    const [nodes, setNodes] = useLocalStorage<Node[]>('nodes', []);

    const importJson = (file: File, unitId: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data: ImportedData = JSON.parse(e.target?.result as string);

                    if (!data.topics || !Array.isArray(data.topics)) {
                        reject(new Error('Archivo JSON inválido'));
                        return;
                    }

                    const existingNames = topics
                        .filter(t => t.unitId === unitId)
                        .map(t => t.name);

                    const newTopics: Topic[] = [];
                    const newNodes: Node[] = [];

                    for (const importedTopic of data.topics) {
                        const resolvedName = resolveTopicName(importedTopic.name, [
                            ...existingNames,
                            ...newTopics.map(t => t.name),
                        ]);

                        const topicId = generateId();
                        newTopics.push({ id: topicId, unitId, name: resolvedName });

                        // Map old node IDs to new IDs
                        const idMap = new Map<string, string>();
                        for (const node of importedTopic.nodes) {
                            idMap.set(node.id, generateId());
                        }

                        for (const node of importedTopic.nodes) {
                            newNodes.push({
                                id: idMap.get(node.id)!,
                                topicId,
                                parentId: node.parentId ? (idMap.get(node.parentId) ?? null) : null,
                                label: node.label,
                                content: node.content,
                                contentMode: node.contentMode,
                                order: node.order,
                            });
                        }
                    }

                    setTopics(prev => [...prev, ...newTopics]);
                    setNodes(prev => [...prev, ...newNodes]);
                    resolve();
                } catch {
                    reject(new Error('Error al leer el archivo JSON'));
                }
            };

            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            reader.readAsText(file);
        });
    };

    return { importJson };
};
