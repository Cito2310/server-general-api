import { useState } from 'react';
import { useTopicsPage } from './hooks/useTopicsPage';
import { TopicForm } from './components/TopicForm';
import { TopicItem } from './components/TopicItem';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';
import { EmptyState } from '../shared/components/EmptyState';
import { ExportModal } from '../shared/components/ExportModal';

export const TopicsPage = () => {
    const {
        unit,
        subject,
        topics,
        nodes,
        edit,
        remove,
        showForm,
        setShowForm,
        handleCreate,
    } = useTopicsPage();

    const [showExport, setShowExport] = useState(false);

    if (!unit) return <div className="p-10 text-gray-400">Unidad no encontrada</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[
                    { label: 'Materias', to: '/' },
                    { label: subject?.name ?? '...', to: `/subjects/${subject?.id}` },
                    { label: unit.name },
                ]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{unit.name}</h1>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setShowExport(true)}>Exportar...</Button>
                        <Button onClick={() => setShowForm(true)}>+ Nuevo Tema</Button>
                    </div>
                </div>

                {topics.length === 0 ? ( <EmptyState title="Aún no hay temas" subtitle="Crea el primer tema para esta unidad" /> ) : (
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

            {showExport && subject && (
                <ExportModal
                    subject={subject}
                    unit={unit}
                    topics={topics}
                    allNodes={nodes}
                    onClose={() => setShowExport(false)}
                />
            )}
        </div>
    );
};
