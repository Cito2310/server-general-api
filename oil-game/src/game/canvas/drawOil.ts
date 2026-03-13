import type { GameGrid } from '../game.types'

const OIL_FILL = '#1a3a0a'
const OIL_STROKE = '#2a5a10'

export const drawOil = (ctx: CanvasRenderingContext2D, grid: GameGrid) => {
    for (const bag of grid.oilBags) {
        if (bag.remainingOil <= 0) continue

        const { polygon } = bag
        if (polygon.length < 3) continue

        ctx.beginPath()
        ctx.moveTo(polygon[0].x, polygon[0].y)
        for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y)
        }
        ctx.closePath()

        ctx.fillStyle = OIL_FILL
        ctx.fill()
        ctx.strokeStyle = OIL_STROKE
        ctx.lineWidth = 1.5
        ctx.stroke()
    }
}
