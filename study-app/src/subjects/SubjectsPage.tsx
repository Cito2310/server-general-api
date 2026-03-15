import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubjects } from './hooks/useSubjects';
import { SubjectForm } from './components/SubjectForm';
import { Button } from '../shared/components/Button';
import type { Subject } from '../types';

export const SubjectsPage = () => {
    const { subjects, create, edit, remove } = useSubjects();
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Subject | null>(null);
    const navigate = useNavigate();

    const handleSave = (name: string) => {
        if (editing) {
            edit(editing.id, name);
        } else {
            create(name);
        }
        setEditing(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Subjects</h1>
                    <Button onClick={() => setShowForm(true)}>+ New Subject</Button>
                </div>

                {subjects.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No subjects yet</p>
                        <p className="text-sm mt-1">Create your first subject to get started</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {subjects.map(subject => (
                            <div
                                key={subject.id}
                                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                            >
                                <button
                                    className="text-left font-medium text-gray-900 hover:text-gray-600 cursor-pointer flex-1"
                                    onClick={() => navigate(`/subjects/${subject.id}`)}
                                >
                                    {subject.name}
                                </button>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditing(subject)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => remove(subject.id)}
                                    >
                                        <span className="text-red-400 hover:text-red-600">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(showForm || editing) && (
                <SubjectForm
                    subject={editing ?? undefined}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditing(null); }}
                />
            )}
        </div>
    );
};
