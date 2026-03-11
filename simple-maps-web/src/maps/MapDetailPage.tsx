import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMapDetail } from './hooks/useMapDetail'
import NodeTree from './components/NodeTree'
import NodeFormModal from './components/NodeFormModal'
import type { Node } from './map.types'

type ModalState =
    | { mode: 'create' }
    | { mode: 'add-child'; parentId: string; parentLabel: string }
    | { mode: 'edit'; node: Node }
    | null

const MapDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { map, loading, error, addNode, updateNode, deleteNode, addChildNode } = useMapDetail(id!)
    const [modal, setModal] = useState<ModalState>(null)

    const handleSubmit = async (data: Omit<Node, '_id' | 'children'>) => {
        if (!modal) return
        if (modal.mode === 'create') {
            await addNode(data)
        } else if (modal.mode === 'add-child') {
            await addChildNode(modal.parentId, data)
        } else if (modal.mode === 'edit') {
            await updateNode(modal.node._id, data)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
                <button
                    onClick={() => navigate('/maps')}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    ← Volver
                </button>
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                    {map?.title ?? '...'}
                </h1>
            </header>

            <main className="max-w-full px-6 py-8">
                {loading && (
                    <p className="text-sm text-gray-400 text-center py-16">Cargando...</p>
                )}

                {error && (
                    <p className="text-sm text-red-500 text-center py-16">{error}</p>
                )}

                {!loading && map && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Nodos</h2>
                            <button
                                onClick={() => setModal({ mode: 'create' })}
                                data-testid="new-node-btn"
                                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                + Nuevo nodo
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <NodeTree
                                nodes={map.nodes}
                                onAddChild={(parentId) => {
                                    const parent = map.nodes.find((n) => n._id === parentId)
                                    setModal({ mode: 'add-child', parentId, parentLabel: parent?.label ?? '' })
                                }}
                                onEdit={(node) => setModal({ mode: 'edit', node })}
                                onDelete={deleteNode}
                            />
                        </div>
                    </>
                )}
            </main>

            {modal && (
                <NodeFormModal
                    nodeToEdit={modal.mode === 'edit' ? modal.node : null}
                    parentLabel={modal.mode === 'add-child' ? modal.parentLabel : undefined}
                    onClose={() => setModal(null)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}

export default MapDetailPage
