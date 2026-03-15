import { useState } from 'react';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Topic } from '../../types';

interface Props {
    topic?: Topic;
    onSave: (name: string) => void;
    onClose: () => void;
}

export const TopicForm = ({ topic, onSave, onClose }: Props) => {
    const [name, setName] = useState(topic?.name ?? '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(name.trim());
        onClose();
    };

    return (
        <Modal title={topic ? 'Edit Topic' : 'New Topic'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="E.g.: Economic Model"
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
