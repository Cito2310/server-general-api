import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaterias } from './hooks/useMaterias';
import { MateriaForm } from './components/MateriaForm';
import { Button } from '../shared/components/Button';
import type { Materia } from '../types';

export const MateriasPage = () => {
    const { materias, crear, editar, eliminar } = useMaterias();
    const [showForm, setShowForm] = useState(false);
    const [editando, setEditando] = useState<Materia | null>(null);
    const navigate = useNavigate();

    const handleSave = (nombre: string) => {
        if (editando) {
            editar(editando.id, nombre);
        } else {
            crear(nombre);
        }
        setEditando(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Mis Materias</h1>
                    <Button onClick={() => setShowForm(true)}>+ Nueva materia</Button>
                </div>

                {materias.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">No hay materias aún</p>
                        <p className="text-sm mt-1">Crea tu primera materia para empezar</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {materias.map(materia => (
                            <div
                                key={materia.id}
                                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                            >
                                <button
                                    className="text-left font-medium text-gray-900 hover:text-gray-600 cursor-pointer flex-1"
                                    onClick={() => navigate(`/materias/${materia.id}`)}
                                >
                                    {materia.nombre}
                                </button>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditando(materia)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => eliminar(materia.id)}
                                    >
                                        <span className="text-red-400 hover:text-red-600">Eliminar</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(showForm || editando) && (
                <MateriaForm
                    materia={editando ?? undefined}
                    onSave={handleSave}
                    onClose={() => { setShowForm(false); setEditando(null); }}
                />
            )}
        </div>
    );
};
