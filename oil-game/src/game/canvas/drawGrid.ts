import type { GameGrid } from '../game.types'

const SURFACE_FILL = '#6B5A3E'
const UNDERGROUND_FILL = '#2C1F14'
const UNDERGROUND_STROKE = '#1A0F08'
const BOUNDARY_COLOR = '#8B6914'

export const drawGrid = (ctx: CanvasRenderingContext2D, grid: GameGrid, showUnderground = true, removedIds: Set<number> = new Set()) => {
    // Surface: flat rectangle
    ctx.fillStyle = SURFACE_FILL
    ctx.fillRect(0, 0, grid.width, grid.surfaceBoundaryY)

    if (!showUnderground) return

    // Underground: triangular grid
    for (const tri of grid.triangles) {
        if (removedIds.has(tri.id)) continue
        const [a, b, c] = tri.vertices

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.closePath()

        ctx.fillStyle = UNDERGROUND_FILL
        ctx.fill()

        ctx.strokeStyle = UNDERGROUND_STROKE
        ctx.lineWidth = 0.5
        ctx.stroke()
    }

    // Flat boundary line
    ctx.beginPath()
    ctx.moveTo(0, grid.surfaceBoundaryY)
    ctx.lineTo(grid.width, grid.surfaceBoundaryY)
    ctx.strokeStyle = BOUNDARY_COLOR
    ctx.lineWidth = 2
    ctx.stroke()
}
