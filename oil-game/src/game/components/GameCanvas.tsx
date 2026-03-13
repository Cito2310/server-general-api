import { useRef, useEffect, useState, useCallback } from 'react'
import { useGrid } from '../hooks/useGrid'
import { drawGrid } from '../canvas/drawGrid'
import { drawOil } from '../canvas/drawOil'
import { isPointInTriangle } from '../utils/geometry'

interface Props {
    showUnderground: boolean
    digMode: boolean
}

const GameCanvas = ({ showUnderground, digMode }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const [removedIds, setRemovedIds] = useState<Set<number>>(new Set())

    useEffect(() => {
        const onResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const grid = useGrid(size.width, size.height)

    useEffect(() => {
        if (!grid) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, grid.width, grid.height)
        drawOil(ctx, grid)
        drawGrid(ctx, grid, showUnderground, removedIds)
    }, [grid, showUnderground, removedIds])

    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!digMode || !grid) return
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        for (const tri of grid.triangles) {
            const [a, b, c] = tri.vertices
            if (isPointInTriangle({ x, y }, a, b, c)) {
                setRemovedIds(prev => new Set([...prev, tri.id]))
                break
            }
        }
    }, [digMode, grid])

    return (
        <canvas
            ref={canvasRef}
            width={size.width}
            height={size.height}
            className="block"
            onClick={handleClick}
            style={{ cursor: digMode ? 'crosshair' : 'default' }}
        />
    )
}

export default GameCanvas
