import type { GameGrid, Point, Triangle } from '../game.types'

export const GRID_COLS = 50
export const GRID_ROWS = 30
export const SURFACE_RATIO = 0.2
const JITTER = 0.5
const MIN_AREA_RATIO = 0.3 // min triangle area = 30% of cell area
const FIX_ITERATIONS = 3

const triArea = (a: Point, b: Point, c: Point): number =>
    Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) * 0.5

const cellHasThinTri = (
    pts: Point[][],
    r: number, c: number,
    minArea: number
): boolean => {
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return false
    const tl = pts[r][c], tr = pts[r][c + 1]
    const bl = pts[r + 1][c], br = pts[r + 1][c + 1]
    return triArea(tl, tr, bl) < minArea || triArea(tr, br, bl) < minArea
}

const fixThinTriangles = (
    pts: Point[][],
    cellW: number,
    cellH: number,
    surfaceBoundaryY: number
): void => {
    const minArea = cellW * cellH * MIN_AREA_RATIO

    for (let iter = 0; iter < FIX_ITERATIONS; iter++) {
        for (let row = 1; row < GRID_ROWS; row++) {
            for (let col = 1; col < GRID_COLS; col++) {
                const hasThin =
                    cellHasThinTri(pts, row - 1, col - 1, minArea) ||
                    cellHasThinTri(pts, row - 1, col, minArea) ||
                    cellHasThinTri(pts, row, col - 1, minArea) ||
                    cellHasThinTri(pts, row, col, minArea)

                if (hasThin) {
                    const gridX = col * cellW
                    const gridY = surfaceBoundaryY + row * cellH
                    pts[row][col].x = pts[row][col].x * 0.5 + gridX * 0.5
                    pts[row][col].y = pts[row][col].y * 0.5 + gridY * 0.5
                }
            }
        }
    }
}

export const generateGrid = (canvasWidth: number, canvasHeight: number): GameGrid => {
    const surfaceBoundaryY = canvasHeight * SURFACE_RATIO
    const undergroundHeight = canvasHeight - surfaceBoundaryY
    const cellW = canvasWidth / GRID_COLS
    const cellH = undergroundHeight / GRID_ROWS

    const pts: Point[][] = []
    for (let row = 0; row <= GRID_ROWS; row++) {
        pts[row] = []
        for (let col = 0; col <= GRID_COLS; col++) {
            const isEdge = row === 0 || row === GRID_ROWS || col === 0 || col === GRID_COLS
            const jx = isEdge ? 0 : (Math.random() - 0.5) * cellW * JITTER * 2
            const jy = isEdge ? 0 : (Math.random() - 0.5) * cellH * JITTER * 2
            pts[row][col] = {
                x: col * cellW + jx,
                y: surfaceBoundaryY + row * cellH + jy,
            }
        }
    }

    fixThinTriangles(pts, cellW, cellH, surfaceBoundaryY)

    const triangles: Triangle[] = []
    let id = 0

    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const tl = pts[row][col]
            const tr = pts[row][col + 1]
            const bl = pts[row + 1][col]
            const br = pts[row + 1][col + 1]

            triangles.push({
                id: id++,
                vertices: [tl, tr, bl],
                centroid: {
                    x: (tl.x + tr.x + bl.x) / 3,
                    y: (tl.y + tr.y + bl.y) / 3,
                },
                row,
                col,
                subIndex: 0,
            })

            triangles.push({
                id: id++,
                vertices: [tr, br, bl],
                centroid: {
                    x: (tr.x + br.x + bl.x) / 3,
                    y: (tr.y + br.y + bl.y) / 3,
                },
                row,
                col,
                subIndex: 1,
            })
        }
    }

    return { triangles, oilBags: [], width: canvasWidth, height: canvasHeight, surfaceBoundaryY }
}
