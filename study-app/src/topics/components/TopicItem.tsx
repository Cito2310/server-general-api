import { useTopicItem } from '../hooks/useTopicItem';
import { NodeItem } from '../../nodes/components/NodeItem';
import { NodeForm } from '../../nodes/components/NodeForm';
import { TopicActions } from './TopicActions';
import { TopicForm } from './TopicForm';
import type { Topic } from '../../types';

interface Props {
    topic: Topic;
    onEdit: (id: string, name: string) => void;
    onDelete: (id: string) => void;
}

export const TopicItem = ({ topic, onEdit, onDelete }: Props) => {
    const {
        rootNodes,
        hasNodes,
        expanded,
        toggleExpanded,
        showAddRoot,
        setShowAddRoot,
        showEditForm,
        setShowEditForm,
        handleCreateRoot,
        handleAddNode,
    } = useTopicItem(topic);

    return (
        <div className="bg-white border border-gray-200 rounded-xl">
            {/* Topic header */}
            <div className="group flex items-center gap-2 px-5 py-4">
                <button
                    onClick={toggleExpanded}
                    className="text-gray-400 hover:text-gray-700 cursor-pointer text-xs w-4 shrink-0"
                >
                    {expanded ? '▼' : '▶'}
                </button>

                <span className="flex-1 font-semibold text-gray-900">{topic.name}</span>
                <TopicActions
                    onAddNode={handleAddNode}
                    onEdit={() => setShowEditForm(true)}
                    onDelete={() => onDelete(topic.id)}
                />
            </div>

            {/* Expanded node tree */}
            {expanded && (
                <div className="px-5 pb-4 border-t border-gray-100">
                    {hasNodes ? (
                        <div className="pt-3">
                            {rootNodes.map(node => (
                                <NodeItem key={node.id} node={node} topicId={topic.id} depth={0} />
                            ))}
                        </div>
                    ) : (
                        <div className="pt-4 pb-2 text-center text-gray-400 text-sm">
                            No content.{' '}
                            <button
                                className="underline cursor-pointer hover:text-gray-600"
                                onClick={() => setShowAddRoot(true)}
                            >
                                Add node
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showAddRoot && (
                <NodeForm
                    onSave={handleCreateRoot}
                    onClose={() => setShowAddRoot(false)}
                />
            )}

            {showEditForm && (
                <TopicForm
                    topic={topic}
                    onSave={(name) => { onEdit(topic.id, name); setShowEditForm(false); }}
                    onClose={() => setShowEditForm(false)}
                />
            )}
        </div>
    );
};
