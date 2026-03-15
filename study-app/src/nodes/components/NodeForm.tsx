import { useState } from 'react';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Node } from '../../types';

interface Props {
    node?: Node;
    parentLabel?: string;
    onSave: (label: string, content: string, contentMode: 'inline' | 'block') => void;
    onClose: () => void;
}

export const NodeForm = ({ node, parentLabel, onSave, onClose }: Props) => {
    const [label, setLabel] = useState(node?.label ?? '');
    const [content, setContent] = useState(node?.content ?? '');
    const [contentMode, setContentMode] = useState<'inline' | 'block'>(node?.contentMode ?? 'block');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!label.trim()) return;
        onSave(label.trim(), content.trim(), contentMode);
        onClose();
    };

    const title = node ? 'Edit Node' : parentLabel ? `Add child to "${parentLabel}"` : 'New Root Node';

    return (
        <Modal title={title} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Title"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    placeholder="E.g.: Definition"
                    autoFocus
                />
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Content <span className="text-gray-400">(optional)</span></label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Description or node content..."
                        rows={4}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                    />
                </div>

                {content.trim() && (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Display content</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setContentMode('inline')}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                    contentMode === 'inline'
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                Inline
                            </button>
                            <button
                                type="button"
                                onClick={() => setContentMode('block')}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                    contentMode === 'block'
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                Below
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!label.trim()}>Save</Button>
                </div>
            </form>
        </Modal>
    );
};
