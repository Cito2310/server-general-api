import type { Node, NodeType } from '../map.types'

const TYPE_STYLES: Record<NodeType, {
    card: string
    label: string
    desc: string
    badge: string
    btn: string
}> = {
    titulo: {
        card: 'bg-gray-900 border-gray-900',
        label: 'text-base font-bold text-white',
        desc: 'text-xs text-gray-300 mt-0.5',
        badge: 'text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full',
        btn: 'px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors cursor-pointer',
    },
    concepto: {
        card: 'bg-white border-gray-200',
        label: 'text-sm font-medium text-gray-900',
        desc: 'text-xs text-gray-500 mt-0.5',
        badge: 'text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full',
        btn: 'px-2 py-1 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer',
    },
    subtitulo: {
        card: 'bg-white border-gray-300',
        label: 'text-sm font-semibold text-gray-700',
        desc: 'text-xs text-gray-500 mt-0.5',
        badge: 'text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full',
        btn: 'px-2 py-1 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer',
    },
    ejemplo: {
        card: 'bg-gray-50 border-dashed border-gray-300',
        label: 'text-sm font-medium text-gray-600',
        desc: 'text-xs text-gray-400 mt-0.5',
        badge: 'text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200',
        btn: 'px-2 py-1 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors cursor-pointer',
    },
    nota: {
        card: 'bg-white border-gray-200 border-l-4 border-l-gray-400',
        label: 'text-sm font-medium italic text-gray-700',
        desc: 'text-xs text-gray-400 mt-0.5',
        badge: 'text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full',
        btn: 'px-2 py-1 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer',
    },
}

type Props = {
    node: Node
    allNodes: Node[]
    depth: number
    onAddChild: (parentId: string) => void
    onEdit: (node: Node) => void
    onDelete: (nodeId: string) => void
}

const NodeItem = ({ node, allNodes, depth, onAddChild, onEdit, onDelete }: Props) => {
    const children = allNodes.filter((n) => node.children.includes(n._id))
    const s = TYPE_STYLES[node.type] ?? TYPE_STYLES.concepto

    return (
        <div className="flex items-center py-2">
            <div className={`group shrink-0 border rounded-lg px-3 py-2 min-w-35 max-w-100 ${s.card}`}>
                {node.description ? (
                    <>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={s.label}>{node.label}</span>
                            <span className={s.badge}>{node.type}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onAddChild(node._id)} title="Agregar hijo" data-testid={`add-child-btn-${node._id}`} className={s.btn}>
                                    + hijo
                                </button>
                                <button onClick={() => onEdit(node)} title="Editar" data-testid={`edit-node-btn-${node._id}`} className={s.btn}>
                                    Editar
                                </button>
                                <button onClick={() => onDelete(node._id)} title="Eliminar" data-testid={`delete-node-btn-${node._id}`} className={s.btn}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <p className={s.desc}>{node.description}</p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={s.label}>{node.label}</span>
                            <span className={s.badge}>{node.type}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1.5">
                            <button onClick={() => onAddChild(node._id)} title="Agregar hijo" data-testid={`add-child-btn-${node._id}`} className={s.btn}>
                                + hijo
                            </button>
                            <button onClick={() => onEdit(node)} title="Editar" data-testid={`edit-node-btn-${node._id}`} className={s.btn}>
                                Editar
                            </button>
                            <button onClick={() => onDelete(node._id)} title="Eliminar" data-testid={`delete-node-btn-${node._id}`} className={s.btn}>
                                Eliminar
                            </button>
                        </div>
                    </>
                )}
            </div>

            {children.length > 0 && (
                <div className="self-stretch flex items-center">
                    <div className="w-6 h-px bg-gray-200 shrink-0" />
                    <div className="self-stretch flex flex-col">
                        {children.map((child, i) => {
                            const isFirst = i === 0
                            const isLast = i === children.length - 1
                            const isOnly = children.length === 1

                            return (
                                <div key={child._id} className="flex items-center">
                                    <div className="relative w-6 self-stretch shrink-0">
                                        {!isOnly && (
                                            <div className={`absolute left-0 w-px bg-gray-200 ${
                                                isFirst ? 'top-1/2 bottom-0' :
                                                isLast  ? 'top-0 bottom-1/2' :
                                                          'inset-y-0'
                                            }`} />
                                        )}
                                        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                                            <div className="w-full h-px bg-gray-200" />
                                        </div>
                                    </div>
                                    <NodeItem
                                        node={child}
                                        allNodes={allNodes}
                                        depth={depth + 1}
                                        onAddChild={onAddChild}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NodeItem
