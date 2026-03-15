import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTopics } from './hooks/useTopics';
import { useUnits } from '../units/hooks/useUnits';
import { useSubjects } from '../subjects/hooks/useSubjects';
import { TopicForm } from './components/TopicForm';
import { TopicItem } from './components/TopicItem';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';

export const TopicsPage = () => {
    const { unitId } = useParams<{ unitId: string }>();
    const { subjects } = useSubjects();
    const { units } = useUnits();
    const { create, edit, remove, byUnit } = useTopics();
    const [showForm, setShowForm] = useState(false);

    const unit = units.find(u => u.id === unitId);
    const subject = subjects.find(s => s.id === unit?.subjectId);
    const topics = byUnit(unitId!);

    if (!unit) return <div className="p-10 text-gray-400">Unit not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[
                    { label: 'Subjects', to: '/' },
                    { label: subject?.name ?? '...', to: `/subjects/${subject?.id}` },
                    { label: unit.name },
                ]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{unit.name}</h1>
                    <Button onClick={() => setShowForm(true)}>+ New Topic</Button>
                </div>

                {topics.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No topics yet</p>
                        <p className="text-sm mt-1">Create the first topic for this unit</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {topics.map(topic => (
                            <TopicItem
                                key={topic.id}
                                topic={topic}
                                onEdit={(id, name) => edit(id, name)}
                                onDelete={(id) => remove(id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <TopicForm
                    onSave={(name) => { create(unitId!, name); setShowForm(false); }}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};
