import type { Derrick } from '../game.types'
import type { AssetMap } from '../hooks/useAssets'

const DERRICK_HEIGHT = 55
const DERRICK_BASE_WIDTH = 28
const DERRICK_COLOR = '#A08060'
const DERRICK_LINE_WIDTH = 2.5

const SPRITE_WIDTH = 64
const SPRITE_HEIGHT = 80

export const drawDerricks = (
    ctx: CanvasRenderingContext2D,
    derricks: Derrick[],
    surfaceBoundaryY: number,
    assets?: AssetMap,
) => {
    for (const d of derricks) {
        const bx = d.x
        const by = surfaceBoundaryY

        const img = assets?.['derrick']
        if (img) {
            ctx.drawImage(img, bx - SPRITE_WIDTH / 2, by - SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT)
            continue
        }

        // Fallback vectorial si no hay asset cargado
        const ty = by - DERRICK_HEIGHT
        const hw = DERRICK_BASE_WIDTH / 2

        ctx.strokeStyle = DERRICK_COLOR
        ctx.lineWidth = DERRICK_LINE_WIDTH
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(bx - hw, by)
        ctx.lineTo(bx, ty)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(bx + hw, by)
        ctx.lineTo(bx, ty)
        ctx.stroke()

        const cross1Y = by - DERRICK_HEIGHT * 0.4
        const cross1HW = hw * 0.6
        ctx.beginPath()
        ctx.moveTo(bx - cross1HW, cross1Y)
        ctx.lineTo(bx + cross1HW, cross1Y)
        ctx.stroke()

        const cross2Y = by - DERRICK_HEIGHT * 0.7
        const cross2HW = hw * 0.28
        ctx.beginPath()
        ctx.moveTo(bx - cross2HW, cross2Y)
        ctx.lineTo(bx + cross2HW, cross2Y)
        ctx.stroke()

        ctx.fillStyle = DERRICK_COLOR
        ctx.beginPath()
        ctx.arc(bx, by, 4, 0, Math.PI * 2)
        ctx.fill()
    }
}
