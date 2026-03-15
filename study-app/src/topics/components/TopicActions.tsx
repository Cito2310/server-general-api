import { Button } from '../../shared/components/Button';

interface Props {
    onAddNode: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const TopicActions = ({ onAddNode, onEdit, onDelete }: Props) => {
    return (
        <div className="hidden group-hover:flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onAddNode}>
                + node
            </Button>
            <Button variant="ghost" size="sm" onClick={onEdit}>
                Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
                <span className="text-red-400">Delete</span>
            </Button>
        </div>
    );
};
