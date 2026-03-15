import { useState } from 'react';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import type { Nodo } from '../../types';

interface Props {
    nodo?: Nodo;
    parentLabel?: string;
    onSave: (label: string, contenido: string, contenidoModo: 'inline' | 'bloque') => void;
    onClose: () => void;
}

export const NodoForm = ({ nodo, parentLabel, onSave, onClose }: Props) => {
    const [label, setLabel] = useState(nodo?.label ?? '');
    const [contenido, setContenido] = useState(nodo?.contenido ?? '');
    const [contenidoModo, setContenidoModo] = useState<'inline' | 'bloque'>(nodo?.contenidoModo ?? 'bloque');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!label.trim()) return;
        onSave(label.trim(), contenido.trim(), contenidoModo);
        onClose();
    };

    const titulo = nodo ? 'Editar nodo' : parentLabel ? `Agregar hijo a "${parentLabel}"` : 'Nuevo nodo raíz';

    return (
        <Modal title={titulo} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Título"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    placeholder="Ej: Definición"
                    autoFocus
                />
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Contenido <span className="text-gray-400">(opcional)</span></label>
                    <textarea
                        value={contenido}
                        onChange={e => setContenido(e.target.value)}
                        placeholder="Descripción o contenido del nodo..."
                        rows={4}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                    />
                </div>

                {contenido.trim() && (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Mostrar contenido</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setContenidoModo('inline')}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                    contenidoModo === 'inline'
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                En la misma línea
                            </button>
                            <button
                                type="button"
                                onClick={() => setContenidoModo('bloque')}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                    contenidoModo === 'bloque'
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                Abajo
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" disabled={!label.trim()}>Guardar</Button>
                </div>
            </form>
        </Modal>
    );
};
