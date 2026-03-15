import { useState } from 'react';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Tema } from '../../types';

interface Props {
    tema?: Tema;
    onSave: (nombre: string) => void;
    onClose: () => void;
}

export const TemaForm = ({ tema, onSave, onClose }: Props) => {
    const [nombre, setNombre] = useState(tema?.nombre ?? '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        onSave(nombre.trim());
        onClose();
    };

    return (
        <Modal title={tema ? 'Editar tema' : 'Nuevo tema'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ej: Modelo Económico"
                    autoFocus
                />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" disabled={!nombre.trim()}>Guardar</Button>
                </div>
            </form>
        </Modal>
    );
};
