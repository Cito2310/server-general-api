import type { OilBag } from '../game.types'

const OIL_FILL = '#1a3a0a'
const OIL_STROKE = '#2a5a10'
const OIL_EXTRACT_FILL = '#7c3a00'
const OIL_EXTRACT_STROKE = '#c46000'

export const drawOil = (ctx: CanvasRenderingContext2D, oilBags: OilBag[]) => {
    for (const bag of oilBags) {
        if (bag.remainingOil <= 0) continue

        const { polygon } = bag
        if (polygon.length < 3) continue

        const ratio = bag.remainingOil / bag.totalOil

        ctx.beginPath()
        ctx.moveTo(polygon[0].x, polygon[0].y)
        for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y)
        }
        ctx.closePath()

        ctx.globalAlpha = 0.4 + ratio * 0.6
        ctx.fillStyle = bag.extracting ? OIL_EXTRACT_FILL : OIL_FILL
        ctx.fill()
        ctx.strokeStyle = bag.extracting ? OIL_EXTRACT_STROKE : OIL_STROKE
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.globalAlpha = 1
    }
}
