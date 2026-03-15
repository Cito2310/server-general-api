import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnidades } from './hooks/useUnidades';
import { useMaterias } from '../materias/hooks/useMaterias';
import { UnidadForm } from './components/UnidadForm';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';
import type { Unidad } from '../types';

export const UnidadesPage = () => {
    const { materiaId } = useParams<{ materiaId: string }>();
    const { materias } = useMaterias();
    const { crear, editar, eliminar, porMateria } = useUnidades();
    const [showForm, setShowForm] = useState(false);
    const [editando, setEditando] = useState<Unidad | null>(null);
    const navigate = useNavigate();

    const materia = materias.find(m => m.id === materiaId);
    const unidades = porMateria(materiaId!);

    const handleSave = (nombre: string) => {
        if (editando) {
            editar(editando.id, nombre);
        } else {
            crear(materiaId!, nombre);
        }
        setEditando(null);
    };

    if (!materia) return <div className="p-10 text-gray-400">Materia no encontrada</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[{ label: 'Materias', to: '/' }, { label: materia.nombre }]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{materia.nombre}</h1>
                    <Button onClick={() => setShowForm(true)}>+ Nueva unidad</Button>
                </div>

                {unidades.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No hay unidades aún</p>
                        <p className="text-sm mt-1">Crea la primera unidad de esta materia</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {unidades.map(unidad => (
                            <div
                                key={unidad.id}
                                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                            >
                                <button
                                    className="text-left font-medium text-gray-900 hover:text-gray-600 cursor-pointer flex-1"
                                    onClick={() => navigate(`/unidades/${unidad.id}`)}
                                >
                                    {unidad.nombre}
                                </button>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => setEditando(unidad)}>
                                        Editar
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => eliminar(unidad.id)}>
                                        <span className="text-red-400 hover:text-red-600">Eliminar</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(showForm || editando) && (
                <UnidadForm
                    unidad={editando ?? undefined}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditando(null); }}
                />
            )}
        </div>
    );
};
