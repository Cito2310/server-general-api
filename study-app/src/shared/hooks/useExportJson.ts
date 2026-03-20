import { saveAs } from 'file-saver';
import type { Unit, Topic, Node } from '../../types';

interface ExportJsonParams {
    unit: Unit;
    topics: Topic[];
    allNodes: Node[];
}

export const useExportJson = () => {
    const exportJson = ({ unit, topics, allNodes }: ExportJsonParams) => {
        const topicsWithNodes = topics.map(topic => ({
            id: topic.id,
            name: topic.name,
            nodes: allNodes.filter(n => n.topicId === topic.id),
        }));

        const data = { unit, topics: topicsWithNodes };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        saveAs(blob, `${unit.name}.json`);
    };

    return { exportJson };
};
