import type { Pipe, Point } from '../game.types'

const PIPE_COLOR = '#5C3A1E'
const PIPE_PREVIEW_COLOR = 'rgba(92, 58, 30, 0.5)'
const PIPE_WIDTH = 4

export const drawPipes = (
    ctx: CanvasRenderingContext2D,
    pipes: Pipe[],
    pendingFrom?: Point,
    mousePos?: Point,
    previewCost?: number,
) => {
    ctx.lineWidth = PIPE_WIDTH
    ctx.lineCap = 'round'
    ctx.setLineDash([])
    ctx.strokeStyle = PIPE_COLOR

    for (const pipe of pipes) {
        ctx.beginPath()
        ctx.moveTo(pipe.from.x, pipe.from.y)
        ctx.lineTo(pipe.to.x, pipe.to.y)
        ctx.stroke()
    }

    if (pendingFrom && mousePos) {
        ctx.strokeStyle = PIPE_PREVIEW_COLOR
        ctx.setLineDash([6, 5])
        ctx.beginPath()
        ctx.moveTo(pendingFrom.x, pendingFrom.y)
        ctx.lineTo(mousePos.x, mousePos.y)
        ctx.stroke()
        ctx.setLineDash([])

        if (previewCost !== undefined) {
            ctx.font = 'bold 12px monospace'
            ctx.fillStyle = 'rgba(255, 220, 100, 0.9)'
            ctx.fillText(`$${previewCost}`, mousePos.x + 12, mousePos.y - 8)
        }
    }
}
