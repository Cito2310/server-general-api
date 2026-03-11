import { useNavigate } from 'react-router-dom'
import type { Map } from '../map.types'

type Props = {
    map: Map
    onEdit: (map: Map) => void
    onDelete: (id: string) => void
}

const MapCard = ({ map, onEdit, onDelete }: Props) => {
    const navigate = useNavigate()

    const formattedDate = new Date(map.updatedAt).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4 hover:border-gray-400 transition-colors">
            <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base truncate">
                    {map.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                    Editado {formattedDate}
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => navigate(`/maps/${map._id}`)}
                    data-testid="open-map-btn"
                    className="flex-1 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    Abrir
                </button>
                <button
                    onClick={() => onEdit(map)}
                    data-testid="edit-map-btn"
                    className="px-3 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(map._id)}
                    data-testid="delete-map-btn"
                    className="px-3 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default MapCard
