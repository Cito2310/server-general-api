import type { Point } from '../game.types'

type VertexKey = string

export const vertexKey = (p: Point): VertexKey =>
    `${p.x.toFixed(2)},${p.y.toFixed(2)}`

const edgeKey = (a: Point, b: Point): string => {
    const ka = vertexKey(a), kb = vertexKey(b)
    return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
}

export const findBoundaryEdges = (
    triangles: { vertices: [Point, Point, Point] }[]
): [Point, Point][] => {
    const edgeMap = new Map<string, [Point, Point]>()
    for (const tri of triangles) {
        const [a, b, c] = tri.vertices
        for (const [p, q] of [[a, b], [b, c], [c, a]] as [Point, Point][]) {
            const key = edgeKey(p, q)
            if (edgeMap.has(key)) edgeMap.delete(key)
            else edgeMap.set(key, [p, q])
        }
    }
    return [...edgeMap.values()]
}

export const chainEdges = (edges: [Point, Point][]): Point[] => {
    if (edges.length === 0) return []

    const adj = new Map<VertexKey, Point[]>()
    const pointByKey = new Map<VertexKey, Point>()

    for (const [a, b] of edges) {
        const ka = vertexKey(a), kb = vertexKey(b)
        pointByKey.set(ka, a)
        pointByKey.set(kb, b)
        if (!adj.has(ka)) adj.set(ka, [])
        if (!adj.has(kb)) adj.set(kb, [])
        adj.get(ka)!.push(b)
        adj.get(kb)!.push(a)
    }

    const polygon: Point[] = []
    const visited = new Set<VertexKey>()
    const startKey = adj.keys().next().value as VertexKey
    let currentKey = startKey
    let prevKey: VertexKey | null = null

    while (!visited.has(currentKey)) {
        visited.add(currentKey)
        polygon.push(pointByKey.get(currentKey)!)
        const neighbors = adj.get(currentKey) ?? []
        const next = neighbors.find(n => vertexKey(n) !== prevKey)
        if (!next) break
        prevKey = currentKey
        currentKey = vertexKey(next)
    }

    return polygon
}

export const isPointInTriangle = (p: Point, a: Point, b: Point, c: Point): boolean => {
    const d1 = (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y)
    const d2 = (p.x - c.x) * (b.y - c.y) - (b.x - c.x) * (p.y - c.y)
    const d3 = (p.x - a.x) * (c.y - a.y) - (c.x - a.x) * (p.y - a.y)
    const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
    const hasPos = d1 > 0 || d2 > 0 || d3 > 0
    return !(hasNeg && hasPos)
}

export const isConvexPolygon = (polygon: Point[]): boolean => {
    const n = polygon.length
    if (n < 3) return true
    let sign = 0
    for (let i = 0; i < n; i++) {
        const a = polygon[i]
        const b = polygon[(i + 1) % n]
        const c = polygon[(i + 2) % n]
        const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x)
        if (Math.abs(cross) > 0.01) {
            if (sign === 0) sign = Math.sign(cross)
            else if (Math.sign(cross) !== sign) return false
        }
    }
    return true
}
