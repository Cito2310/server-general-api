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
        <Modal title={unit ? 'Edit Unit' : 'New Unit'} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Name"
                    placeholder="E.g.: Unit 1 - Introduction"
                    autoFocus
                    {...register('name', { required: true, validate: v => !!v.trim() })}
                />
                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!isValid}>Save</Button>
                </div>
            </form>
        </Modal>
    );
};
