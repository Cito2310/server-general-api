import { useState } from 'react';
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
    const [name, setName] = useState(unit?.name ?? '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(name.trim());
        onClose();
    };

    return (
        <Modal title={unit ? 'Edit Unit' : 'New Unit'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="E.g.: Unit 1 - Introduction"
                    autoFocus
                />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!name.trim()}>Save</Button>
                </div>
            </form>
        </Modal>
    );
};
