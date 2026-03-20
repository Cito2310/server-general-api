import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubjects } from './useSubjects';
import type { Subject } from '../../types';

export const useSubjectsPage = () => {
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

    const handleEdit = (subject: Subject) => setEditing(subject);

    const handleClose = () => {
        setShowForm(false);
        setEditing(null);
    };

    const handleNavigate = (id: string) => navigate(`/subjects/${id}`);

    return {
        subjects,
        remove,
        showForm,
        setShowForm,
        editing,
        handleSave,
        handleEdit,
        handleClose,
        handleNavigate,
    };
};
