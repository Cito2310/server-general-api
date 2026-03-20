import { Button } from '../../shared/components/Button';

interface Props {
    onAddChild: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const NodeActions = ({ onAddChild, onEdit, onDelete }: Props) => {
    return (
        <div className="hidden group-hover:flex items-center gap-1 absolute right-0">
            <Button variant="ghost" size="sm" onClick={onAddChild}>
                + hijo
            </Button>
            <Button variant="ghost" size="sm" onClick={onEdit}>
                Editar
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
                <span className="text-red-400">Eliminar</span>
            </Button>
        </div>
    );
};
