import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMapForm } from '../hooks/useMapForm'
import type { Map } from '../map.types'

type Props = {
    mapToEdit?: Map | null
    onClose: () => void
}

type FormData = {
    title: string
}

const MapFormModal = ({ mapToEdit, onClose }: Props) => {
    const { submit, loading, error } = useMapForm({ onSuccess: onClose })
    const { register, handleSubmit, setFocus } = useForm<FormData>({
        defaultValues: { title: mapToEdit?.title ?? '' },
    })

    useEffect(() => {
        setFocus('title')
    }, [setFocus])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    const onSubmit = (data: FormData) => {
        submit(data.title.trim(), mapToEdit?._id)
    }

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold text-gray-900 mb-5">
                    {mapToEdit ? 'Editar mapa conceptual' : 'Nuevo mapa conceptual'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre del mapa conceptual"
                            data-testid="map-title-input"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400"
                            {...register('title', { required: true })}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div className="flex gap-2 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            data-testid="map-save-btn"
                            className="flex-1 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MapFormModal
