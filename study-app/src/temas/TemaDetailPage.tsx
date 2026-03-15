import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTemas } from './hooks/useTemas';
import { useUnidades } from '../unidades/hooks/useUnidades';
import { useMaterias } from '../materias/hooks/useMaterias';
import { useNodos } from '../nodos/hooks/useNodos';
import { NodoItem } from '../nodos/components/NodoItem';
import { NodoForm } from '../nodos/components/NodoForm';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';

export const TemaDetailPage = () => {
    const { temaId } = useParams<{ temaId: string }>();
    const { temas } = useTemas();
    const { unidades } = useUnidades();
    const { materias } = useMaterias();
    const { crear, hijos } = useNodos();
    const [showAddRoot, setShowAddRoot] = useState(false);

    const tema = temas.find(t => t.id === temaId);
    const unidad = unidades.find(u => u.id === tema?.unidadId);
    const materia = materias.find(m => m.id === unidad?.materiaId);
    const nodosRaiz = hijos(temaId!, null);

    const handleCrearRaiz = (label: string, contenido: string) => {
        crear(temaId!, null, label, contenido);
    };

    if (!tema) return <div className="p-10 text-gray-400">Tema no encontrado</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[
                    { label: 'Materias', to: '/' },
                    { label: materia?.nombre ?? '...', to: `/materias/${materia?.id}` },
                    { label: unidad?.nombre ?? '...', to: `/unidades/${unidad?.id}` },
                    { label: tema.nombre },
                ]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{tema.nombre}</h1>
                    <Button onClick={() => setShowAddRoot(true)}>+ Agregar nodo</Button>
                </div>

                {nodosRaiz.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">Este tema está vacío</p>
                        <p className="text-sm mt-1">Agrega el primer nodo de contenido</p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
                        {nodosRaiz.map(nodo => (
                            <NodoItem key={nodo.id} nodo={nodo} temaId={temaId!} depth={0} />
                        ))}
                    </div>
                )}
            </div>

            {showAddRoot && (
                <NodoForm
                    onSave={handleCrearRaiz}
                    onClose={() => setShowAddRoot(false)}
                />
            )}
        </div>
    );
};
