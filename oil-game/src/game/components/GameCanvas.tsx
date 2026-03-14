import { useRef, useEffect, useState, useCallback } from 'react'
import { useGrid } from '../hooks/useGrid'
import { useAssets } from '../hooks/useAssets'
import { drawGrid } from '../canvas/drawGrid'
import { drawOil } from '../canvas/drawOil'
import { drawDerricks } from '../canvas/drawStructures'
import { drawPipes } from '../canvas/drawPipes'
import {
    isPointInTriangle,
    segmentsIntersect,
    triangleIntersectsSegment,
    isPointInPolygon,
} from '../utils/geometry'
import {
    COST_DIG,
    COST_DERRICK,
    COST_PER_PX,
} from '../systems/economy'
import type { GameMode, Derrick, Pipe, Point, OilBag, GameGrid } from '../game.types'

interface Props {
    showUnderground: boolean
    mode: GameMode
    balance: number
    derricks: Derrick[]
    pipes: Pipe[]
    onAddDerrick: (d: Derrick) => void
    onAddPipe: (p: Pipe) => void
    onSpend: (amount: number) => void
    onOilExtracted: (barrels: number) => void
    onOilBagsChange: (bags: OilBag[]) => void
}

const SNAP_RADIUS = 12
const EXTRACTION_RATE = 10
const EXTRACTION_TICK = 500

const ASSET_PATHS: Record<string, string> = {
    'derrick': '/assets/petroleo.png',
}

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

const findPipeOrigin = (
    pos: Point,
    derricks: Derrick[],
    pipes: Pipe[],
    surfaceBoundaryY: number,
): Point | null => {
    for (const d of derricks) {
        const mouth = { x: d.x, y: surfaceBoundaryY }
        if (dist(pos, mouth) <= SNAP_RADIUS) return mouth
    }
    for (const p of pipes) {
        if (dist(pos, p.to) <= SNAP_RADIUS) return p.to
        if (dist(pos, p.from) <= SNAP_RADIUS) return p.from
    }
    return null
}

interface RenderState {
    grid: GameGrid | null
    showUnderground: boolean
    removedIds: Set<number>
    derricks: Derrick[]
    pipes: Pipe[]
    oilBags: OilBag[]
    pendingPipeOrigin: Point | null
    mousePos: Point | null
}

const GameCanvas = ({
    showUnderground,
    mode,
    balance,
    derricks,
    pipes,
    onAddDerrick,
    onAddPipe,
    onSpend,
    onOilExtracted,
    onOilBagsChange,
}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [removedIds, setRemovedIds] = useState<Set<number>>(new Set())
    const [oilBags, setOilBags] = useState<OilBag[]>([])

    const renderRef = useRef<RenderState>({
        grid: null,
        showUnderground,
        removedIds,
        derricks,
        pipes,
        oilBags,
        pendingPipeOrigin: null,
        mousePos: null,
    })

    const rafRef = useRef(0)
    const timeRef = useRef(0)
    const modeRef = useRef(mode)

    const onOilExtractedRef = useRef(onOilExtracted)
    useEffect(() => { onOilExtractedRef.current = onOilExtracted }, [onOilExtracted])

    // Sincronizar props/state → renderRef (pendingPipeOrigin y mousePos se manejan directo en ref)
    useEffect(() => { renderRef.current.showUnderground = showUnderground }, [showUnderground])
    useEffect(() => { renderRef.current.removedIds = removedIds }, [removedIds])
    useEffect(() => { renderRef.current.derricks = derricks }, [derricks])
    useEffect(() => { renderRef.current.pipes = pipes }, [pipes])
    useEffect(() => { renderRef.current.oilBags = oilBags }, [oilBags])

    // Cuando cambia el modo, resetear el estado de tubería pendiente sin pasar por setState
    useEffect(() => {
        if (modeRef.current === 'place-pipe' && mode !== 'place-pipe') {
            renderRef.current.pendingPipeOrigin = null
            renderRef.current.mousePos = null
        }
        modeRef.current = mode
    }, [mode])

    const { assets } = useAssets(ASSET_PATHS)
    const assetsRef = useRef(assets)
    useEffect(() => { assetsRef.current = assets }, [assets])

    useEffect(() => {
        const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const grid = useGrid(size.width, size.height)

    useEffect(() => {
        renderRef.current.grid = grid
    }, [grid])

    useEffect(() => {
        if (!grid) return
        // Inicialización diferida para no llamar setState directamente en el cuerpo del effect
        const bags = grid.oilBags.map(b => ({ ...b, extracting: false }))
        setTimeout(() => setOilBags(bags), 0)
    }, [grid])

    useEffect(() => {
        const id = setInterval(() => {
            setOilBags(prev => {
                if (!prev.some(b => b.extracting && b.remainingOil > 0)) return prev
                let extracted = 0
                const next = prev.map(b => {
                    if (!b.extracting || b.remainingOil <= 0) return b
                    const actual = Math.min(b.remainingOil, EXTRACTION_RATE)
                    extracted += actual
                    const nextOil = b.remainingOil - actual
                    return { ...b, remainingOil: nextOil, extracting: nextOil > 0 }
                })
                if (extracted > 0) onOilExtractedRef.current(extracted)
                return next
            })
        }, EXTRACTION_TICK)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        onOilBagsChange(oilBags)
    }, [oilBags, onOilBagsChange])

    // Game loop — único lugar donde se dibuja el canvas
    useEffect(() => {
        let lastTime = performance.now()

        const loop = (now: number) => {
            const delta = now - lastTime
            lastTime = now
            timeRef.current += delta

            const { grid, showUnderground, removedIds, derricks, pipes, oilBags, pendingPipeOrigin, mousePos } = renderRef.current
            const canvas = canvasRef.current
            const ctx = canvas?.getContext('2d')

            if (canvas && ctx && grid) {
                const previewCost = pendingPipeOrigin && mousePos
                    ? Math.round(dist(pendingPipeOrigin, mousePos) * COST_PER_PX)
                    : undefined

                ctx.clearRect(0, 0, grid.width, grid.height)
                drawOil(ctx, oilBags)
                drawGrid(ctx, grid, showUnderground, removedIds)
                drawPipes(ctx, pipes, pendingPipeOrigin ?? undefined, mousePos ?? undefined, previewCost)
                drawDerricks(ctx, derricks, grid.surfaceBoundaryY, assetsRef.current)
            }

            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const { grid } = renderRef.current
        if (!grid) return
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }

        if (mode === 'dig') {
            if (balance < COST_DIG) return
            for (const tri of grid.triangles) {
                const [a, b, c] = tri.vertices
                if (isPointInTriangle(pos, a, b, c)) {
                    setRemovedIds(prev => new Set([...prev, tri.id]))
                    onSpend(COST_DIG)
                    break
                }
            }
        } else if (mode === 'place-derrick') {
            if (balance < COST_DERRICK) return
            if (pos.y < grid.surfaceBoundaryY) {
                onAddDerrick({ id: Date.now(), x: pos.x })
                onSpend(COST_DERRICK)
            }
        } else if (mode === 'place-pipe') {
            const { pendingPipeOrigin, derricks, pipes } = renderRef.current
            if (!pendingPipeOrigin) {
                const origin = findPipeOrigin(pos, derricks, pipes, grid.surfaceBoundaryY)
                if (origin) renderRef.current.pendingPipeOrigin = origin
            } else {
                if (pos.y <= grid.surfaceBoundaryY) return

                const pipeCost = Math.round(dist(pendingPipeOrigin, pos) * COST_PER_PX)
                if (balance < pipeCost) return

                const hasIntersection = pipes.some(pipe => {
                    if (
                        dist(pendingPipeOrigin, pipe.from) < 1 ||
                        dist(pendingPipeOrigin, pipe.to) < 1
                    ) return false
                    return segmentsIntersect(pendingPipeOrigin, pos, pipe.from, pipe.to)
                })
                if (hasIntersection) return

                onAddPipe({ id: Date.now(), from: pendingPipeOrigin, to: pos })
                onSpend(pipeCost)

                const crossed = grid.triangles
                    .filter(tri => triangleIntersectsSegment(tri.vertices, pendingPipeOrigin, pos))
                    .map(tri => tri.id)
                setRemovedIds(prev => new Set([...prev, ...crossed]))

                setOilBags(prev => prev.map(bag => {
                    if (bag.extracting || bag.remainingOil <= 0) return bag
                    if (isPointInPolygon(pos, bag.polygon)) return { ...bag, extracting: true }
                    return bag
                }))

                renderRef.current.pendingPipeOrigin = null
            }
        }
    }, [mode, balance, onAddDerrick, onAddPipe, onSpend])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (mode !== 'place-pipe' || !renderRef.current.pendingPipeOrigin) return
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        renderRef.current.mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }, [mode])

    const getCursor = () => {
        if (mode === 'dig') return 'crosshair'
        if (mode === 'place-derrick') return 'cell'
        if (mode === 'place-pipe') return 'crosshair'
        return 'default'
    }

    return (
        <canvas
            ref={canvasRef}
            width={size.width}
            height={size.height}
            className="block"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            style={{ cursor: getCursor() }}
        />
    )
}

export default GameCanvas
