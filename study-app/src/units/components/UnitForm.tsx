import { useNameForm } from '../../shared/hooks/useNameForm';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Unit } from '../../types';

interface Props {
    unit?: Unit;
    onSave: (name: string) => void;
    onClose: () => void;
}

export const UnitForm = ({ unit, onSave, onClose }: Props) => {
    const { register, handleSubmit, errors, isValid, onSubmit } = useNameForm({
        defaultName: unit?.name,
        onSave,
        onClose,
    });

    return (
        <Modal title={unit ? 'Editar Unidad' : 'Nueva Unidad'} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Nombre"
                    placeholder="Ej.: Unidad 1 - Introducción"
                    autoFocus
                    {...register('name', { required: true, validate: v => !!v.trim() })}
                />
                {errors.name && <p className="text-red-500 text-sm">El nombre es requerido</p>}
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" disabled={!isValid}>Guardar</Button>
                </div>
            </form>
        </Modal>
    );
};
