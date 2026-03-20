import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { buildWordDocument } from '../utils/buildWordDocument';
import type { Subject, Unit, Topic, Node } from '../../types';

interface ExportWordParams {
    subject: Subject;
    unit: Unit;
    topics: Topic[];
    allNodes: Node[];
}

export const useExportWord = () => {
    const exportWord = async ({ subject, unit, topics, allNodes }: ExportWordParams) => {
        const doc = buildWordDocument(subject, unit, topics, allNodes);
        const blob = await Packer.toBlob(doc);
        const filename = `${subject.name} - ${unit.name}.docx`;
        saveAs(blob, filename);
    };

    return { exportWord };
};
