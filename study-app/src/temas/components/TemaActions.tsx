import { Button } from '../../shared/components/Button';

interface Props {
    onAddNodo: () => void;
    onEditar: () => void;
    onEliminar: () => void;
}

export const TemaActions = ({ onAddNodo, onEditar, onEliminar }: Props) => {
    return (
        <div className="hidden group-hover:flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onAddNodo}>
                + nodo
            </Button>
            <Button variant="ghost" size="sm" onClick={onEditar}>
                Editar
            </Button>
            <Button variant="ghost" size="sm" onClick={onEliminar}>
                <span className="text-red-400">Eliminar</span>
            </Button>
        </div>
    );
};
