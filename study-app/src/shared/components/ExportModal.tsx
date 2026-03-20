import { useRef, useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { Subject, Unit, Topic, Node } from '../../types';
import { useExportWord } from '../hooks/useExportWord';
import { useExportJson } from '../hooks/useExportJson';
import { useImportJson } from '../hooks/useImportJson';

interface ExportModalProps {
    subject: Subject;
    unit: Unit;
    topics: Topic[];
    allNodes: Node[];
    onClose: () => void;
}

export const ExportModal = ({ subject, unit, topics, allNodes, onClose }: ExportModalProps) => {
    const { exportWord } = useExportWord();
    const { exportJson } = useExportJson();
    const { importJson } = useImportJson();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importError, setImportError] = useState<string | null>(null);
    const [importSuccess, setImportSuccess] = useState(false);

    const handleExportWord = () => {
        exportWord({ subject, unit, topics, allNodes });
        onClose();
    };

    const handleExportJson = () => {
        exportJson({ unit, topics, allNodes });
        onClose();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImportError(null);
        setImportSuccess(false);

        try {
            await importJson(file, unit.id);
            setImportSuccess(true);
            setTimeout(onClose, 800);
        } catch (err) {
            setImportError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <Modal title="Exportar / Importar" onClose={onClose}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Exportar</p>
                    <div className="flex gap-2">
                        <Button className="flex-1" variant="secondary" onClick={handleExportWord}>
                            Word (.docx)
                        </Button>
                        <Button className="flex-1" variant="secondary" onClick={handleExportJson}>
                            JSON (.json)
                        </Button>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Importar</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                        Cargar JSON
                    </Button>
                    {importError && <p className="text-xs text-red-500">{importError}</p>}
                    {importSuccess && <p className="text-xs text-green-600">Importado correctamente</p>}
                </div>
            </div>
        </Modal>
    );
};
