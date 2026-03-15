import { Button } from '../../shared/components/Button';

interface Props {
    onAddHijo: () => void;
    onEditar: () => void;
    onEliminar: () => void;
}

export const NodoActions = ({ onAddHijo, onEditar, onEliminar }: Props) => {
    return (
        <div className="hidden group-hover:flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onAddHijo}>
                + hijo
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
