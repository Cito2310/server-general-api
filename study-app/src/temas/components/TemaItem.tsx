import { useState } from 'react';
import { useNodos } from '../../nodos/hooks/useNodos';
import { NodoItem } from '../../nodos/components/NodoItem';
import { NodoForm } from '../../nodos/components/NodoForm';
import { TemaActions } from './TemaActions';
import { TemaForm } from './TemaForm';
import type { Tema } from '../../types';

interface Props {
    tema: Tema;
    onEditar: (id: string, nombre: string) => void;
    onEliminar: (id: string) => void;
}

export const TemaItem = ({ tema, onEditar, onEliminar }: Props) => {
    const { hijos, crear } = useNodos();
    const [expandido, setExpandido] = useState(false);
    const [showAddRoot, setShowAddRoot] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const nodosRaiz = hijos(tema.id, null);
    const tieneNodos = nodosRaiz.length > 0;

    const handleCrearRaiz = (label: string, contenido: string, contenidoModo: 'inline' | 'bloque') => {
        crear(tema.id, null, label, contenido, contenidoModo);
        setExpandido(true);
        setShowAddRoot(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl">
            {/* Cabecera del tema */}
            <div className="group flex items-center gap-2 px-5 py-4">
                <button
                    onClick={() => setExpandido(v => !v)}
                    className="text-gray-400 hover:text-gray-700 cursor-pointer text-xs w-4 shrink-0"
                >
                    {expandido ? '▼' : '▶'}
                </button>

                <span className="flex-1 font-semibold text-gray-900">{tema.nombre}</span>
                <TemaActions
                    onAddNodo={() => { setShowAddRoot(true); setExpandido(true); }}
                    onEditar={() => setShowEditForm(true)}
                    onEliminar={() => onEliminar(tema.id)}
                />
            </div>

            {/* Árbol de nodos expandido */}
            {expandido && (
                <div className="px-5 pb-4 border-t border-gray-100">
                    {tieneNodos ? (
                        <div className="pt-3">
                            {nodosRaiz.map(nodo => (
                                <NodoItem key={nodo.id} nodo={nodo} temaId={tema.id} depth={0} />
                            ))}
                        </div>
                    ) : (
                        <div className="pt-4 pb-2 text-center text-gray-400 text-sm">
                            Sin contenido.{' '}
                            <button
                                className="underline cursor-pointer hover:text-gray-600"
                                onClick={() => setShowAddRoot(true)}
                            >
                                Agregar nodo
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showAddRoot && (
                <NodoForm
                    onSave={handleCrearRaiz}
                    onClose={() => setShowAddRoot(false)}
                />
            )}

            {showEditForm && (
                <TemaForm
                    tema={tema}
                    onSave={(nombre) => { onEditar(tema.id, nombre); setShowEditForm(false); }}
                    onClose={() => setShowEditForm(false)}
                />
            )}
        </div>
    );
};
