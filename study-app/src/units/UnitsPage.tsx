import { useUnitsPage } from './hooks/useUnitsPage';
import { UnitForm } from './components/UnitForm';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Button } from '../shared/components/Button';
import { EmptyState } from '../shared/components/EmptyState';
import { ItemActions } from '../shared/components/ItemActions';

export const UnitsPage = () => {
    const {
        subject,
        units,
        remove,
        showForm,
        setShowForm,
        editing,
        handleSave,
        handleEdit,
        handleClose,
        handleNavigate,
    } = useUnitsPage();

    if (!subject) return <div className="p-10 text-gray-400">Materia no encontrada</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <Breadcrumb crumbs={[{ label: 'Materias', to: '/' }, { label: subject.name }]} />

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
                    <Button onClick={() => setShowForm(true)}>+ Nueva Unidad</Button>
                </div>

                {units.length === 0 ? ( <EmptyState title="Aún no hay unidades" subtitle="Crea la primera unidad para esta materia" /> ) : (
                    <div className="flex flex-col gap-3">
                        {units.map(unit => (
                            <div
                                key={unit.id}
                                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                            >
                                <button
                                    className="text-left font-medium text-gray-900 hover:text-gray-600 cursor-pointer flex-1"
                                    onClick={() => handleNavigate(unit.id)}
                                >
                                    {unit.name}
                                </button>
                                <ItemActions
                                    onEdit={() => handleEdit(unit)}
                                    onDelete={() => remove(unit.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(showForm || editing) && (
                <UnitForm
                    unit={editing ?? undefined}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};
