import { useTopicsPage } from './hooks/useTopicsPage';
import { TopicForm } from './components/TopicForm';
import { TopicItem } from './components/TopicItem';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';
import { EmptyState } from '../shared/components/EmptyState';

export const TopicsPage = () => {
    const {
        unit,
        subject,
        topics,
        edit,
        remove,
        showForm,
        setShowForm,
        handleCreate,
    } = useTopicsPage();

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

                {topics.length === 0 ? ( <EmptyState title="No topics yet" subtitle="Create the first topic for this unit" /> ) : (
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
                    onSave={handleCreate}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};
