import { useState, useEffect } from 'react'
import type { GameGrid } from '../game.types'
import { generateGrid } from '../systems/gridGeneration'
import { generateOilBags } from '../systems/oilGeneration'

export const useGrid = (canvasWidth: number, canvasHeight: number) => {
    const [grid, setGrid] = useState<GameGrid | null>(null)

    useEffect(() => {
        if (canvasWidth > 0 && canvasHeight > 0) {
            const rawGrid = generateGrid(canvasWidth, canvasHeight)
            const { oilBags } = generateOilBags(rawGrid)
            setGrid({ ...rawGrid, oilBags })
        }
    }, [canvasWidth, canvasHeight])

    return grid
}
