import { useState } from 'react';
import { useNodes } from '../../nodes/hooks/useNodes';
import type { Topic } from '../../types';

export const useTopicItem = (topic: Topic) => {
    const { children, create } = useNodes();
    const [expanded, setExpanded] = useState(false);
    const [showAddRoot, setShowAddRoot] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const rootNodes = children(topic.id, null);
    const hasNodes = rootNodes.length > 0;

    const handleCreateRoot = (label: string, content: string, contentMode: 'inline' | 'block') => {
        create(topic.id, null, label, content, contentMode);
        setExpanded(true);
        setShowAddRoot(false);
    };

    const handleAddNode = () => {
        setShowAddRoot(true);
        setExpanded(true);
    };

    const toggleExpanded = () => setExpanded(v => !v);

    return {
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
    };
};
