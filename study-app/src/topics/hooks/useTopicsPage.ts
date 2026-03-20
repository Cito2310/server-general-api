import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTopics } from './useTopics';
import { useUnits } from '../../units/hooks/useUnits';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { useNodes } from '../../nodes/hooks/useNodes';

export const useTopicsPage = () => {
    const { unitId } = useParams<{ unitId: string }>();
    const { subjects } = useSubjects();
    const { units } = useUnits();
    const { create, edit, remove, byUnit } = useTopics();
    const { nodes } = useNodes();
    const [showForm, setShowForm] = useState(false);

    const unit = units.find(u => u.id === unitId);
    const subject = subjects.find(s => s.id === unit?.subjectId);
    const topics = byUnit(unitId!);

    const handleCreate = (name: string) => {
        create(unitId!, name);
        setShowForm(false);
    };

    return {
        unit,
        subject,
        topics,
        nodes,
        edit,
        remove,
        showForm,
        setShowForm,
        handleCreate,
    };
};
