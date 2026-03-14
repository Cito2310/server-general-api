export interface Point {
    x: number
    y: number
}

export interface Triangle {
    id: number
    vertices: [Point, Point, Point]
    centroid: Point
    row: number
    col: number
    subIndex: 0 | 1
    oilBagId?: number
}

export interface OilBag {
    id: number
    polygon: Point[]
    totalOil: number
    remainingOil: number
    extracting: boolean
}

export interface Derrick {
    id: number
    x: number
}

export interface Pipe {
    id: number
    from: Point
    to: Point
}

export interface GameGrid {
    triangles: Triangle[]
    oilBags: OilBag[]
    width: number
    height: number
    surfaceBoundaryY: number
}

export type GameMode = 'dig' | 'place-derrick' | 'place-pipe' | null
