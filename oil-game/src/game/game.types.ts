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
}

export interface GameGrid {
    triangles: Triangle[]
    oilBags: OilBag[]
    width: number
    height: number
    surfaceBoundaryY: number
}
