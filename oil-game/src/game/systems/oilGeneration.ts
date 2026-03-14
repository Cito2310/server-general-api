import type { GameGrid, OilBag, Point } from '../game.types'
import { GRID_COLS, GRID_ROWS } from './gridGeneration'

const NUM_BAGS = 20
const MIN_AREA_TRIANGLES = 5
const BASE_OIL = 500
const MAX_OIL = 2000
// Mínimo de celdas de profundidad desde la superficie antes de que aparezca una bolsa
const MIN_DEPTH_CELLS = 4

// Polígono convexo con ángulos equidistantes + radios variables (convexidad garantizada)
const generateConvexPolygon = (
    cx: number, cy: number,
    cellW: number, cellH: number
): Point[] => {
    const numSides = 5 + Math.floor(Math.random() * 4)
    const radiusX = cellW * (2 + Math.random() * 4)
    const radiusY = cellH * (1.5 + Math.random() * 3)
    const rotation = Math.random() * Math.PI * 2

    const pts: Point[] = []
    for (let i = 0; i < numSides; i++) {
        const angle = (i / numSides) * Math.PI * 2 + rotation
        const rScale = 0.75 + Math.random() * 0.5
        pts.push({
            x: cx + radiusX * rScale * Math.cos(angle),
            y: cy + radiusY * rScale * Math.sin(angle),
        })
    }

    // Asegurar CCW
    let area = 0
    for (let i = 0; i < pts.length; i++) {
        const j = (i + 1) % pts.length
        area += pts[i].x * pts[j].y - pts[j].x * pts[i].y
    }
    if (area < 0) pts.reverse()

    return pts
}

const isInsidePolygon = (p: Point, polygon: Point[]): boolean => {
    for (let i = 0; i < polygon.length; i++) {
        const a = polygon[i]
        const b = polygon[(i + 1) % polygon.length]
        const cross = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x)
        if (cross < 0) return false
    }
    return true
}

const polygonsOverlap = (a: Point[], b: Point[]): boolean => {
    // Chequeo rápido: ¿algún vértice de B está dentro de A o viceversa?
    for (const p of b) if (isInsidePolygon(p, a)) return true
    for (const p of a) if (isInsidePolygon(p, b)) return true
    return false
}

export const generateOilBags = (grid: GameGrid): { oilBags: OilBag[] } => {
    const cellW = grid.width / GRID_COLS
    const cellH = (grid.height - grid.surfaceBoundaryY) / GRID_ROWS
    const undergroundH = grid.height - grid.surfaceBoundaryY

    const oilBags: OilBag[] = []

    const minY = grid.surfaceBoundaryY + cellH * MIN_DEPTH_CELLS

    for (let attempt = 0; attempt < NUM_BAGS * 3 && oilBags.length < NUM_BAGS; attempt++) {
        const cx = cellW * 3 + Math.random() * (grid.width - cellW * 6)
        const cy = minY + cellH * 3 + Math.random() * (undergroundH - cellH * MIN_DEPTH_CELLS - cellH * 6)

        const polygon = generateConvexPolygon(cx, cy, cellW, cellH)

        // Rechazar si algún vértice está por encima del límite mínimo de profundidad
        if (polygon.some(p => p.y < minY)) continue

        // Verificar que no se superponga con bolsas existentes
        const overlaps = oilBags.some(bag => polygonsOverlap(polygon, bag.polygon))
        if (overlaps) continue

        // Verificar que tenga área suficiente (equivalente a MIN_AREA_TRIANGLES celdas)
        let area = 0
        for (let i = 0; i < polygon.length; i++) {
            const j = (i + 1) % polygon.length
            area += polygon[i].x * polygon[j].y - polygon[j].x * polygon[i].y
        }
        area = Math.abs(area) / 2
        if (area < cellW * cellH * MIN_AREA_TRIANGLES) continue

        const totalOil = Math.round(MIN_AREA_TRIANGLES + Math.random() * (MAX_OIL - BASE_OIL))

        oilBags.push({
            id: oilBags.length,
            polygon,
            totalOil,
            remainingOil: totalOil,
            extracting: false,
        })
    }

    return { oilBags }
}
