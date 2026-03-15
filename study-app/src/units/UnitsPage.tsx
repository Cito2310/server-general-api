import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnits } from './hooks/useUnits';
import { useSubjects } from '../subjects/hooks/useSubjects';
import { UnitForm } from './components/UnitForm';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';
import type { Unit } from '../types';

export const UnitsPage = () => {
    const { subjectId } = useParams<{ subjectId: string }>();
    const { subjects } = useSubjects();
    const { create, edit, remove, bySubject } = useUnits();
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Unit | null>(null);
    const navigate = useNavigate();

    const subject = subjects.find(s => s.id === subjectId);
    const units = bySubject(subjectId!);

    const handleSave = (name: string) => {
        if (editing) {
            edit(editing.id, name);
        } else {
            create(subjectId!, name);
        }
        setEditing(null);
    };

    if (!subject) return <div className="p-10 text-gray-400">Subject not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[{ label: 'Subjects', to: '/' }, { label: subject.name }]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
                    <Button onClick={() => setShowForm(true)}>+ New Unit</Button>
                </div>

                {units.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No units yet</p>
                        <p className="text-sm mt-1">Create the first unit for this subject</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {units.map(unit => (
                            <div
                                key={unit.id}
                                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                            >
                                <button
                                    className="text-left font-medium text-gray-900 hover:text-gray-600 cursor-pointer flex-1"
                                    onClick={() => navigate(`/units/${unit.id}`)}
                                >
                                    {unit.name}
                                </button>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => setEditing(unit)}>
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => remove(unit.id)}>
                                        <span className="text-red-400 hover:text-red-600">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(showForm || editing) && (
                <UnitForm
                    unit={editing ?? undefined}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditing(null); }}
                />
            )}
        </div>
    );
};
