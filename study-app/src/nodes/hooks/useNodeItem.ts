import { useState } from 'react';
import { useNodes } from './useNodes';
import type { Node } from '../../types';

const indentColors = [
    'border-gray-300',
    'border-blue-200',
    'border-green-200',
    'border-purple-200',
    'border-orange-200',
];

export const useNodeItem = (node: Node, topicId: string, depth: number) => {
    const { children, create, edit, remove } = useNodes();
    const [expanded, setExpanded] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const childNodes = children(topicId, node.id);
    const hasChildren = childNodes.length > 0;
    const borderColor = indentColors[Math.min(depth, indentColors.length - 1)];

    const handleCreate = (label: string, content: string, contentMode: 'inline' | 'block') => {
        create(topicId, node.id, label, content, contentMode);
        setShowAddForm(false);
    };

    const handleEdit = (label: string, content: string, contentMode: 'inline' | 'block') => {
        edit(node.id, label, content, contentMode);
        setShowEditForm(false);
    };

    const handleRemove = () => remove(node.id);

    const toggleExpanded = () => setExpanded(v => !v);

    return {
        childNodes,
        hasChildren,
        borderColor,
        expanded,
        toggleExpanded,
        showAddForm,
        setShowAddForm,
        showEditForm,
        setShowEditForm,
        handleCreate,
        handleEdit,
        handleRemove,
    };
};
