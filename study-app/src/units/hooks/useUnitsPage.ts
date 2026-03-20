import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnits } from './useUnits';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import type { Unit } from '../../types';

export const useUnitsPage = () => {
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

    const handleEdit = (unit: Unit) => setEditing(unit);

    const handleClose = () => {
        setShowForm(false);
        setEditing(null);
    };

    const handleNavigate = (id: string) => navigate(`/units/${id}`);

    return {
        subject,
        units,
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
