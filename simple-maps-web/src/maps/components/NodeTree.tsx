import type { Node } from '../map.types'
import NodeItem from './NodeItem'

type Props = {
    nodes: Node[]
    onAddChild: (parentId: string) => void
    onEdit: (node: Node) => void
    onDelete: (nodeId: string) => void
}

const NodeTree = ({ nodes, onAddChild, onEdit, onDelete }: Props) => {
    const childIds = new Set(nodes.flatMap((n) => n.children))
    const rootNodes = nodes.filter((n) => !childIds.has(n._id))

    if (nodes.length === 0) {
        return (
            <p className="text-sm text-gray-400 text-center py-12">
                Este mapa conceptual no tiene nodos todavía.
            </p>
        )
    }

    return (
        <div className="overflow-x-auto">
        <div className="flex flex-col gap-6 min-w-max">
            {rootNodes.map((node) => (
                <NodeItem
                    key={node._id}
                    node={node}
                    allNodes={nodes}
                    depth={0}
                    onAddChild={onAddChild}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
        </div>
    )
}

export default NodeTree
