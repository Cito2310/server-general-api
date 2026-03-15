import { useState } from 'react';
import { useNodos } from '../hooks/useNodos';
import { NodoForm } from './NodoForm';
import { Button } from '../../shared/components/Button';
import type { Nodo } from '../../types';

interface Props {
    nodo: Nodo;
    temaId: string;
    depth?: number;
}

export const NodoItem = ({ nodo, temaId, depth = 0 }: Props) => {
    const { hijos, crear, editar, eliminar } = useNodos();
    const [expandido, setExpandido] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const nodosHijos = hijos(temaId, nodo.id);
    const tieneHijos = nodosHijos.length > 0;

    const handleCrear = (label: string, contenido: string, contenidoModo: 'inline' | 'bloque') => {
        crear(temaId, nodo.id, label, contenido, contenidoModo);
    };

    const handleEditar = (label: string, contenido: string, contenidoModo: 'inline' | 'bloque') => {
        editar(nodo.id, label, contenido, contenidoModo);
    };

    const indentColors = [
        'border-gray-300',
        'border-blue-200',
        'border-green-200',
        'border-purple-200',
        'border-orange-200',
    ];
    const borderColor = indentColors[Math.min(depth, indentColors.length - 1)];

    return (
        <div className={`${depth > 0 ? `ml-5 border-l-2 ${borderColor}` : ''}`}>
            <div className="group flex items-start gap-2 py-2">
                {tieneHijos && (
                    <button
                        onClick={() => setExpandido(v => !v)}
                        className="mt-0.5 text-gray-400 hover:text-gray-700 cursor-pointer text-xs w-4 flex-shrink-0"
                    >
                        {expandido ? '▼' : '▶'}
                    </button>
                )}
                {!tieneHijos && <span className="w-2 flex-shrink-0" />}

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-gray-900 text-sm">{nodo.label}</span>
                        {nodo.contenido && nodo.contenidoModo === 'inline' && (
                            <span className="text-gray-500 text-sm font-normal">=&gt; {nodo.contenido}</span>
                        )}
                        <div className="max-w-0 overflow-hidden group-hover:max-w-xs flex items-center gap-1 whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="py-0 group-hover:py-1.5" onClick={() => setShowAddForm(true)}>
                                + hijo
                            </Button>
                            <Button variant="ghost" size="sm" className="py-0 group-hover:py-1.5" onClick={() => setShowEditForm(true)}>
                                Editar
                            </Button>
                            <Button variant="ghost" size="sm" className="py-0 group-hover:py-1.5" onClick={() => eliminar(nodo.id)}>
                                <span className="text-red-400">Eliminar</span>
                            </Button>
                        </div>
                    </div>
                    {nodo.contenido && nodo.contenidoModo === 'bloque' && (
                        <p className="text-sm text-gray-500 mt-0.5 whitespace-pre-wrap">{nodo.contenido}</p>
                    )}
                </div>
            </div>

            {expandido && nodosHijos.map(hijo => (
                <NodoItem key={hijo.id} nodo={hijo} temaId={temaId} depth={depth + 1} />
            ))}

            {showAddForm && (
                <NodoForm
                    parentLabel={nodo.label}
                    onSave={handleCrear}
                    onClose={() => setShowAddForm(false)}
                />
            )}
            {showEditForm && (
                <NodoForm
                    nodo={nodo}
                    onSave={handleEditar}
                    onClose={() => setShowEditForm(false)}
                />
            )}
        </div>
    );
};
