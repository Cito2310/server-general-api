import { useNameForm } from '../../shared/hooks/useNameForm';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Subject } from '../../types';

interface Props {
    subject?: Subject;
    onSave: (name: string) => void;
    onClose: () => void;
}

export const SubjectForm = ({ subject, onSave, onClose }: Props) => {
    const { register, handleSubmit, errors, isValid, onSubmit } = useNameForm({
        defaultName: subject?.name,
        onSave,
        onClose,
    });

    return (
        <Modal title={subject ? 'Editar Materia' : 'Nueva Materia'} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Nombre"
                    placeholder="Ej.: Economía"
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
