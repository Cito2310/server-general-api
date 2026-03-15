import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTopics } from './hooks/useTopics';
import { useUnits } from '../units/hooks/useUnits';
import { useSubjects } from '../subjects/hooks/useSubjects';
import { useNodes } from '../nodes/hooks/useNodes';
import { NodeItem } from '../nodes/components/NodeItem';
import { NodeForm } from '../nodes/components/NodeForm';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';

export const TopicDetailPage = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const { topics } = useTopics();
    const { units } = useUnits();
    const { subjects } = useSubjects();
    const { create, children } = useNodes();
    const [showAddRoot, setShowAddRoot] = useState(false);

    const topic = topics.find(t => t.id === topicId);
    const unit = units.find(u => u.id === topic?.unitId);
    const subject = subjects.find(s => s.id === unit?.subjectId);
    const rootNodes = children(topicId!, null);

    const handleCreateRoot = (label: string, content: string) => {
        create(topicId!, null, label, content);
    };

    if (!topic) return <div className="p-10 text-gray-400">Topic not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[
                    { label: 'Subjects', to: '/' },
                    { label: subject?.name ?? '...', to: `/subjects/${subject?.id}` },
                    { label: unit?.name ?? '...', to: `/units/${unit?.id}` },
                    { label: topic.name },
                ]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
                    <Button onClick={() => setShowAddRoot(true)}>+ Add Node</Button>
                </div>

                {rootNodes.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">This topic is empty</p>
                        <p className="text-sm mt-1">Add the first content node</p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
                        {rootNodes.map(node => (
                            <NodeItem key={node.id} node={node} topicId={topicId!} depth={0} />
                        ))}
                    </div>
                )}
            </div>

            {showAddRoot && (
                <NodeForm
                    onSave={handleCreateRoot}
                    onClose={() => setShowAddRoot(false)}
                />
            )}
        </div>
    );
};
