import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Node, NodeType } from '../map.types'

type FormData = {
    label: string
    type: NodeType
    description: string
}

const NODE_TYPE_OPTIONS: { value: NodeType; label: string }[] = [
    { value: 'titulo',    label: 'Título' },
    { value: 'concepto',  label: 'Concepto' },
    { value: 'subtitulo', label: 'Subtítulo' },
    { value: 'ejemplo',   label: 'Ejemplo' },
    { value: 'nota',      label: 'Nota' },
]

type Props = {
    nodeToEdit?: Node | null
    parentLabel?: string
    onClose: () => void
    onSubmit: (data: Omit<Node, '_id' | 'children'>) => void
}

const NodeFormModal = ({ nodeToEdit, parentLabel, onClose, onSubmit }: Props) => {
    const { register, handleSubmit, setFocus } = useForm<FormData>({
        defaultValues: {
            label: nodeToEdit?.label ?? '',
            type: nodeToEdit?.type ?? 'concepto',
            description: nodeToEdit?.description ?? '',
        },
    })

    useEffect(() => {
        setFocus('label')
    }, [setFocus])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    const handleFormSubmit = (data: FormData) => {
        onSubmit({
            label: data.label.trim(),
            type: data.type,
            description: data.description.trim() || undefined,
        })
        onClose()
    }

    const title = nodeToEdit
        ? 'Editar nodo'
        : parentLabel
            ? `Agregar hijo de "${parentLabel}"`
            : 'Nuevo nodo'

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Etiqueta</label>
                        <input
                            type="text"
                            placeholder="Nombre del nodo"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 text-sm outline-none transition-colors placeholder:text-gray-400"
                            data-testid="node-label-input"
                            {...register('label', { required: true })}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 text-sm outline-none transition-colors bg-white"
                            data-testid="node-type-select"
                            {...register('type', { required: true })}
                        >
                            {NODE_TYPE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Descripción <span className="text-gray-400 font-normal">(opcional)</span>
                        </label>
                        <textarea
                            placeholder="Descripción del nodo"
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 text-sm outline-none transition-colors placeholder:text-gray-400 resize-none"
                            data-testid="node-description-input"
                            {...register('description')}
                        />
                    </div>

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
                            data-testid="node-save-btn"
                            className="flex-1 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NodeFormModal
