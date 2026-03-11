import { useState } from 'react'
import { useMaps } from './hooks/useMaps'
import MapCard from './components/MapCard'
import MapFormModal from './components/MapFormModal'
import { useLogout } from '../auth/hooks/useAuth'
import type { Map } from './map.types'

const MapsPage = () => {
    const { maps, loading, error, deleteMap } = useMaps()
    const { logout } = useLogout()
    const [modalOpen, setModalOpen] = useState(false)
    const [mapToEdit, setMapToEdit] = useState<Map | null>(null)

    const openCreate = () => {
        setMapToEdit(null)
        setModalOpen(true)
    }

    const openEdit = (map: Map) => {
        setMapToEdit(map)
        setModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                    Simple Maps
                </h1>
                <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    Cerrar sesión
                </button>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Mis mapas conceptuales</h2>
                    <button
                        onClick={openCreate}
                        data-testid="new-map-btn"
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        + Nuevo mapa conceptual
                    </button>
                </div>

                {loading && (
                    <p className="text-sm text-gray-400 text-center py-16">Cargando...</p>
                )}

                {error && (
                    <p className="text-sm text-red-500 text-center py-16">{error}</p>
                )}

                {!loading && !error && maps.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-400 text-sm">No tenés mapas conceptuales todavía.</p>
                        <button
                            onClick={openCreate}
                            className="mt-3 text-sm text-gray-900 font-medium hover:underline cursor-pointer"
                        >
                            Crear tu primer mapa conceptual
                        </button>
                    </div>
                )}

                {!loading && maps.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {maps.map((map) => (
                            <MapCard
                                key={map._id}
                                map={map}
                                onEdit={openEdit}
                                onDelete={deleteMap}
                            />
                        ))}
                    </div>
                )}
            </main>

            {modalOpen && (
                <MapFormModal
                    mapToEdit={mapToEdit}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    )
}

export default MapsPage
