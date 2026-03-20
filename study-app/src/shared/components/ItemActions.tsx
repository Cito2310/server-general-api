import { Button } from './Button';

interface Props {
    onEdit: () => void;
    onDelete: () => void;
    onAdd?: { label: string; onClick: () => void };
}

export const ItemActions = ({ onEdit, onDelete, onAdd }: Props) => {
    return (
        <div className="flex gap-1">
            {onAdd && (
                <Button variant="ghost" size="sm" onClick={onAdd.onClick}>
                    {onAdd.label}
                </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onEdit}>
                Editar
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
                <span className="text-red-400 hover:text-red-600">Eliminar</span>
            </Button>
        </div>
    );
};
