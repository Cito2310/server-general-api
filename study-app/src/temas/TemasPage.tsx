import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTemas } from './hooks/useTemas';
import { useUnidades } from '../unidades/hooks/useUnidades';
import { useMaterias } from '../materias/hooks/useMaterias';
import { TemaForm } from './components/TemaForm';
import { TemaItem } from './components/TemaItem';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';

export const TemasPage = () => {
    const { unidadId } = useParams<{ unidadId: string }>();
    const { materias } = useMaterias();
    const { unidades } = useUnidades();
    const { crear, editar, eliminar, porUnidad } = useTemas();
    const [showForm, setShowForm] = useState(false);

    const unidad = unidades.find(u => u.id === unidadId);
    const materia = materias.find(m => m.id === unidad?.materiaId);
    const temas = porUnidad(unidadId!);

    if (!unidad) return <div className="p-10 text-gray-400">Unidad no encontrada</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[
                    { label: 'Materias', to: '/' },
                    { label: materia?.nombre ?? '...', to: `/materias/${materia?.id}` },
                    { label: unidad.nombre },
                ]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{unidad.nombre}</h1>
                    <Button onClick={() => setShowForm(true)}>+ Nuevo tema</Button>
                </div>

                {temas.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No hay temas aún</p>
                        <p className="text-sm mt-1">Crea el primer tema de esta unidad</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {temas.map(tema => (
                            <TemaItem
                                key={tema.id}
                                tema={tema}
                                onEditar={(id, nombre) => editar(id, nombre)}
                                onEliminar={(id) => eliminar(id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <TemaForm
                    onSave={(nombre) => { crear(unidadId!, nombre); setShowForm(false); }}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};
