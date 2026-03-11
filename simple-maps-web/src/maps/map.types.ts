export type NodeType = 'titulo' | 'concepto' | 'subtitulo' | 'ejemplo' | 'nota'

export type Node = {
    _id: string
    label: string
    description?: string
    type: NodeType
    children: string[]
}

export type Map = {
    _id: string
    title: string
    owner: string
    nodes: Node[]
    createdAt: string
    updatedAt: string
}
