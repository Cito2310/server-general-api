import { useState } from 'react';
import { useNodes } from '../hooks/useNodes';
import { NodeForm } from './NodeForm';
import { Button } from '../../shared/components/Button';
import type { Node } from '../../types';

interface Props {
    node: Node;
    topicId: string;
    depth?: number;
}

export const NodeItem = ({ node, topicId, depth = 0 }: Props) => {
    const { children, create, edit, remove } = useNodes();
    const [expanded, setExpanded] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const childNodes = children(topicId, node.id);
    const hasChildren = childNodes.length > 0;

    const handleCreate = (label: string, content: string, contentMode: 'inline' | 'block') => {
        create(topicId, node.id, label, content, contentMode);
    };

    const handleEdit = (label: string, content: string, contentMode: 'inline' | 'block') => {
        edit(node.id, label, content, contentMode);
    };

    const indentColors = [
        'border-gray-300',
        'border-blue-200',
        'border-green-200',
        'border-purple-200',
        'border-orange-200',
    ];
    const borderColor = indentColors[Math.min(depth, indentColors.length - 1)];

    return (
        <div className={`${depth > 0 ? `ml-5 border-l-2 ${borderColor}` : ''}`}>
            <div className="group flex items-start gap-2 py-2">
                {hasChildren && (
                    <button
                        onClick={() => setExpanded(v => !v)}
                        className="mt-0.5 text-gray-400 hover:text-gray-700 cursor-pointer text-xs w-4 flex-shrink-0"
                    >
                        {expanded ? '▼' : '▶'}
                    </button>
                )}
                {!hasChildren && <span className="w-2 flex-shrink-0" />}

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-gray-900 text-sm">{node.label}</span>
                        {node.content && node.contentMode === 'inline' && (
                            <span className="text-gray-500 text-sm font-normal">=&gt; {node.content}</span>
                        )}
                        <div className="max-w-0 overflow-hidden group-hover:max-w-xs flex items-center gap-1 whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="py-0 group-hover:py-1.5" onClick={() => setShowAddForm(true)}>
                                + child
                            </Button>
                            <Button variant="ghost" size="sm" className="py-0 group-hover:py-1.5" onClick={() => setShowEditForm(true)}>
                                Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="py-0 group-hover:py-1.5" onClick={() => remove(node.id)}>
                                <span className="text-red-400">Delete</span>
                            </Button>
                        </div>
                    </div>
                    {node.content && node.contentMode === 'block' && (
                        <p className="text-sm text-gray-500 mt-0.5 whitespace-pre-wrap">{node.content}</p>
                    )}
                </div>
            </div>

            {expanded && childNodes.map(child => (
                <NodeItem key={child.id} node={child} topicId={topicId} depth={depth + 1} />
            ))}

            {showAddForm && (
                <NodeForm
                    parentLabel={node.label}
                    onSave={handleCreate}
                    onClose={() => setShowAddForm(false)}
                />
            )}
            {showEditForm && (
                <NodeForm
                    node={node}
                    onSave={handleEdit}
                    onClose={() => setShowEditForm(false)}
                />
            )}
        </div>
    );
};
