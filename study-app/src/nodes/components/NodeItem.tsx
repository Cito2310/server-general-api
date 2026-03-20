import { useNodeItem } from '../hooks/useNodeItem';
import { NodeForm } from './NodeForm';
import { NodeActions } from './NodeActions';
import type { Node } from '../../types';

interface Props {
    node: Node;
    topicId: string;
    depth?: number;
}

export const NodeItem = ({ node, topicId, depth = 0 }: Props) => {
    const {
        childNodes,
        hasChildren,
        borderColor,
        expanded,
        toggleExpanded,
        showAddForm,
        setShowAddForm,
        showEditForm,
        setShowEditForm,
        handleCreate,
        handleEdit,
        handleRemove,
    } = useNodeItem(node, topicId, depth);

    return (
        <div className={`${depth > 0 ? `ml-5 border-l-2 ${borderColor}` : ''}`}>
            <div className="group flex items-start gap-2 py-2">
                {hasChildren && (
                    <button
                        onClick={toggleExpanded}
                        className="mt-0.5 text-gray-400 hover:text-gray-700 cursor-pointer text-xs w-4 shrink-0"
                    >
                        {expanded ? '▼' : '▶'}
                    </button>
                )}
                {!hasChildren && <span className="w-2 shrink-0" />}

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-gray-900 text-sm">{node.label}</span>
                        {node.content && node.contentMode === 'inline' && (
                            <span className="text-gray-500 text-sm font-normal">=&gt; {node.content}</span>
                        )}
                        <NodeActions
                            onAddChild={() => setShowAddForm(true)}
                            onEdit={() => setShowEditForm(true)}
                            onDelete={handleRemove}
                        />
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
